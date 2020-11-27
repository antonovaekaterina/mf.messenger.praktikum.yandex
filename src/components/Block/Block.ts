import EventBus from '../../core/EventBus/index';
import {IRenderContent} from '../../utils/render'
import {IAttribute, IVirtualNode} from './types';
import isEqual from '../../utils/isEqual';

export default class Block<T extends Record<string, any>> {
    private fragment: HTMLElement;
    protected props: T;
    private eventBus: EventBus;
    private content: IRenderContent;
    readonly className: string;
    nestedComponents: any;
    private currentDomTree: any[];

    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_RENDER: 'flow:render',
        FLOW_CDU: 'flow:component-did-update'
    };

    constructor(props: T, className?: any) {
        this.currentDomTree = [];
        this.props = this.makePropsProxy(props);
        this.eventBus = new EventBus();
        this.className = className;

        this.registerEvents();
        this.eventBus.emit(Block.EVENTS.INIT);
    }

    private makePropsProxy(props: T): T {
        return new Proxy(props, {
            set: (target: any, name: string, value: any) => {
                const oldProps = {...target};
                target[name] = value;
                this.eventBus.emit(Block.EVENTS.FLOW_CDU, oldProps, target);
                return true;
            },
            deleteProperty() {
                throw new Error('Нет доступа');
            }
        });
    }

    private registerEvents(): void {
        this.eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        this.eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        this.eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
        this.eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    }

    init(): void {
        this.createResources();
        this.createNestedComponents();
        this.eventBus.emit(Block.EVENTS.FLOW_CDM, this.props);
    }

    private createResources(): void {
        this.fragment = document.createElement('div');
        this.fragment.classList.add('Block');
        if (this.className) {
            this.fragment.classList.add(this.className);
        }
    }

    createNestedComponents() {
        this.nestedComponents = {}
    }

    private _componentDidMount(): void {
        this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
        this.componentDidMount();
    }

    componentDidMount(): void {}

    private _componentDidUpdate(oldProps: T, newProps: T): void {
        const componentShouldUpdate: boolean = this.componentDidUpdate(oldProps, newProps);
        if (componentShouldUpdate) {
            //перерендеринг вложенных компонентов
            Object.keys(this.nestedComponents).forEach((id: string) => {
                const nestedComponentConfig = this.getNestedComponent(id);

                if (!Array.isArray(nestedComponentConfig)) {
                    const nestedComponent = nestedComponentConfig.component;
                    const newNestedComponentProps = nestedComponentConfig.getProps();

                    nestedComponent.setProps(newNestedComponentProps);
                }
            });

            this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    componentDidUpdate(oldProps: T, newProps: T): boolean {
        return !isEqual(oldProps, newProps);
    }

    private _render(): void {
        this.content = this.render();

        const doc = new DOMParser().parseFromString(this.content.html, 'text/html');
        const newDomTree = this.createDOMTreeFromDOM(doc.body).childNodes;

        if (this.currentDomTree.length === 0) {
            this.fragment.innerHTML = this.content.html;

            const nestedComponentsElements: HTMLElement[] = Array.from(this.fragment.querySelectorAll('.component'));

            nestedComponentsElements.forEach((nestedElement: HTMLElement) => {
                let nestedComponent;
                const dataIndex = nestedElement.dataset.index;
                if (dataIndex !== undefined) {
                    nestedComponent = this.getNestedComponent(nestedElement.id)[dataIndex].component;
                } else {
                    nestedComponent = this.getNestedComponent(nestedElement.id).component
                }

                let componentNodes = nestedComponent.getFragment();

                nestedElement.replaceWith(componentNodes);
            });

        } else {
            const startDocumentFragmentNode = this.fragment;
            this.domApplyChanges(this.currentDomTree, newDomTree, startDocumentFragmentNode);
        }

        this.currentDomTree = newDomTree;
    }

    private domApplyChanges(oldDomTree: IVirtualNode[], newDomTree: IVirtualNode[], documentFragmentNode: any): void {
        for (let k = 0; k < newDomTree.length; k++) {
            const curEl = oldDomTree[k];
            const newEl = newDomTree[k];
            if (curEl) {
                switch (curEl.nodeTypeCode) {
                    case 'node':
                        this.applyChangesForElement(curEl,newEl,documentFragmentNode.childNodes[k]);
                        break;
                    case 'text':
                        this.applyChangesForTextNode(curEl,newEl,documentFragmentNode.childNodes[k]);
                        break;
                    default:
                        throw new Error('Нет обработчика для данного типа узла');
                }
            } else {
                this.appendNode(newEl,documentFragmentNode);
            }

            if (newEl.nodeTypeCode === 'node' && newEl.childNodes) {
                const curDocumentFragmentNode = documentFragmentNode.childNodes[k];
                let oldChildNodes:IVirtualNode[] = [];
                if (curEl && 'childNodes' in curEl) {
                    oldChildNodes = curEl.childNodes;
                }
                this.domApplyChanges(oldChildNodes, newEl.childNodes, curDocumentFragmentNode);
            }
        }

        this.removeOldNodes(oldDomTree, newDomTree, documentFragmentNode);
    }

    private removeOldNodes(oldDomTree: IVirtualNode[], newDomTree: IVirtualNode[], documentFragmentNode: any){
        for (let k = oldDomTree.length - 1; k >= newDomTree.length; k--) {
            documentFragmentNode.childNodes[k].remove();
        }
    }

    private appendNode(newNode: IVirtualNode,  documentFragmentNodeChildren: any, needReplace: boolean = false){
        let newDocumentNode;
        if (newNode.nodeTypeCode === 'text') {
            newDocumentNode = document.createTextNode(newNode.textContent ? newNode.textContent : '');
        } else {

            if (newNode.attributes && newNode.attributes.class === 'component'){
                let nestedComponent;
                const dataIndex = newNode.attributes['data-index'];
                const id = newNode.attributes.id;


                if (dataIndex !== undefined) {
                    nestedComponent = this.getNestedComponent(id)[dataIndex].component;
                } else {
                    nestedComponent = this.getNestedComponent(id).component
                }

                newDocumentNode = nestedComponent.getFragment();

            } else {
                newDocumentNode = document.createElement(newNode.tagName);
                for (const attrKey in newNode.attributes) {
                    newDocumentNode.setAttribute(attrKey, newNode.attributes[attrKey]);
                }
            }
        }

        if (needReplace) {
            documentFragmentNodeChildren.replaceWith(newDocumentNode);
        } else {
            documentFragmentNodeChildren.appendChild(newDocumentNode);
        }
    }

    private applyChangesForTextNode(oldNode: IVirtualNode, newTextNode: IVirtualNode, documentFragmentNodeChildren: any): void {
        if (oldNode.nodeTypeCode === 'text' && newTextNode.nodeTypeCode === 'text' && oldNode.textContent !== newTextNode.textContent) {
            documentFragmentNodeChildren.textContent = newTextNode.textContent;
        } else {
            this.appendNode(newTextNode,documentFragmentNodeChildren,true);
            oldNode.childNodes = [];
        }
    }

    private applyChangesForElement(oldNode: IVirtualNode, newNode: IVirtualNode, documentFragmentNodeChildren: any): void {
        if (oldNode.nodeTypeCode === 'node' && newNode.nodeTypeCode === 'node' && oldNode.tagName === newNode.tagName) {
            this.applyChangesForElementAttributes(oldNode,newNode,documentFragmentNodeChildren);
        } else {
            this.appendNode(newNode,documentFragmentNodeChildren,true);
            oldNode.childNodes = [];
        }
    }

    private applyChangesForElementAttributes(oldNode: IVirtualNode, newNode: IVirtualNode, documentFragmentNodeChildren: any){
        for (const attrKey in newNode.attributes) {
            if (oldNode.attributes && oldNode.attributes[attrKey] !== newNode.attributes[attrKey]) {
                documentFragmentNodeChildren.setAttribute(attrKey, newNode.attributes[attrKey]);
            }
            if (oldNode.attributes && attrKey in oldNode.attributes) {
                delete oldNode.attributes[attrKey];
            }
        }

        for (const attrKey in oldNode.attributes) {
            documentFragmentNodeChildren.removeAttribute(attrKey);
        }
    }

    private createDOMTreeFromDOM(domElement: any): IVirtualNode {
        const elementAttributes = Array.from(domElement.attributes);

        const attributes: IAttribute = elementAttributes.reduce((acc: IAttribute, attribute: Attr): IAttribute => {
            acc[attribute.name] = attribute.value;
            return acc;
        }, {}) as IAttribute;

        const DOMTree: IVirtualNode = {
            nodeTypeCode: 'node',
            tagName: domElement.nodeName,
            attributes: attributes,
            childNodes: []
        };

        const elementNodes = Array.from(domElement.childNodes);
        for (let k = 0; k < elementNodes.length; k++) {
            let newElemInfo: any = {};
            const el:any = elementNodes[k];

            if (el.nodeType == 3) {
                newElemInfo.nodeTypeCode = 'text';
                newElemInfo.textContent = el.textContent;
                newElemInfo.childNodes = [];
            } else {
                newElemInfo = this.createDOMTreeFromDOM(el);
            }
            DOMTree.childNodes.push(newElemInfo)
        }

        return DOMTree;
    }

    getNestedComponent(id: string) {
        return this.nestedComponents[id];
    }

    // @ts-ignore
    render(): IRenderContent {}

    getFragment(): HTMLElement {
        return this.fragment;
    }

    setProps(nextProps: any): void {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    show():void {
        this.fragment.style.display = '';
    }

    hide():void {
        this.fragment.style.display = 'none';
    }
}