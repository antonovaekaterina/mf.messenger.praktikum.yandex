import EventBus from '../EventBus/index.js';
import {IEventBusOutput} from '../EventBus/types.js';
import {IRenderContent} from '../../scripts/utils.js'
import {IAttribute, IVirtualNode} from './types.js';

export default class Block {
    private fragment: HTMLElement;
    readonly props: any;
    private eventBus: IEventBusOutput;
    private content: IRenderContent;
    readonly className: string;
    nestedComponents: any;
    private currentDomTree: any[];

    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_RENDER: 'flow:render',
        FLOW_CDU: 'flow:component-did-update',
    };

    constructor(props: any = {}, className?: any) {
        this.currentDomTree = [];
        this.props = this.makePropsProxy(props);
        this.eventBus = new EventBus();
        this.className = className;

        this.registerEvents();
        this.eventBus.emit(Block.EVENTS.INIT);
    }

    private makePropsProxy(props: any) {
        const self = this;
        return new Proxy(props, {
            set(target: any, name: string, value: any) {
                const oldProps = {...target};
                target[name] = value;
                self.eventBus.emit(Block.EVENTS.FLOW_CDU, oldProps, target);
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

    componentDidMount(): void {
    }

    private _componentDidUpdate(oldProps: any, newProps: any): void {
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

    componentDidUpdate(oldProps: any, newProps: any): boolean {
        const keysOldProps: string[] = Object.keys(oldProps);
        const keysNewProps: string[] = Object.keys(newProps);

        if (keysOldProps.length !== keysNewProps.length) {
            return true;
        }

        return keysOldProps.some((key: string) => newProps[key] !== oldProps[key]);
    }

    private _render(): void {
        this.content = this.render();
        const doc = new DOMParser().parseFromString(this.content.html, "text/html");
        const newDomTree = this.createDOMTreeFromDOM(doc.body).childNodes;
        if (!this.currentDomTree.length) {
            this.fragment.innerHTML = this.content.html;

            //замена вложенных компонентов
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

                nestedElement.replaceWith(componentNodes)
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
                if (curEl.nodeTypeCode == newEl.nodeTypeCode) {
                    if (curEl.nodeTypeCode == 'text') {
                        if (curEl.textContent !== newEl.textContent) {
                            documentFragmentNode.childNodes[k].textContent = newEl.textContent;
                        }
                    } else if (curEl.nodeTypeCode == 'node') {
                        if (curEl.tagName == newEl.tagName) {
                            for (let attrKey in newEl.attributes) {
                                if (curEl.attributes && curEl.attributes[attrKey] !== newEl.attributes[attrKey]) {
                                    documentFragmentNode.childNodes[k].setAttribute(attrKey, newEl.attributes[attrKey]);
                                }
                                if (curEl.attributes && attrKey in curEl.attributes) {
                                    delete curEl.attributes[attrKey];
                                }
                            }

                            for (let attrKey in curEl.attributes) {
                                documentFragmentNode.childNodes[k].removeAttribute(attrKey);
                            }
                        } else {
                            const newNode = document.createElement(newEl.tagName);
                            for (let attrKey in newEl.attributes) {
                                newNode.setAttribute(attrKey, newEl.attributes[attrKey]);
                            }
                            documentFragmentNode.childNodes[k].replaceWith(newNode);
                            if (curEl.childNodes) {
                                curEl.childNodes = [];
                            }
                        }
                    }
                } else {
                    const newNode = document.createElement(newEl.tagName);
                    for (let attrKey in newEl.attributes) {
                        newNode.setAttribute(attrKey, newEl.attributes[attrKey]);
                    }
                    documentFragmentNode.childNodes[k].replaceWith(newNode);
                    if (curEl.childNodes) {
                        curEl.childNodes = [];
                    }
                }
            } else {
                let newNode;
                if (newEl.nodeTypeCode == 'text') {
                    newNode = document.createTextNode(newEl.textContent ? newEl.textContent : '');
                } else {
                    newNode = document.createElement(newEl.tagName);
                    for (let attrKey in newEl.attributes) {
                        newNode.setAttribute(attrKey, newEl.attributes[attrKey]);
                    }
                }
                documentFragmentNode.appendChild(newNode);
            }

            if (newEl.nodeTypeCode == 'node' && newEl.childNodes) {
                const curDocumentFragmentNode = documentFragmentNode.childNodes[k];
                let oldChildNodes:IVirtualNode[] = [];
                if (curEl && 'childNodes' in curEl) {
                    oldChildNodes = curEl.childNodes;
                }
                this.domApplyChanges(oldChildNodes, newEl.childNodes, curDocumentFragmentNode);
            }
        }

        for (let k = oldDomTree.length - 1; k >= newDomTree.length; k--) {
            documentFragmentNode.childNodes[k].remove();
        }
    }

    getNestedComponent(id: string) {
        return this.nestedComponents[id];
    }

    // @ts-ignore
    render(): IRenderContent {
    }

    createDOMTreeFromDOM(domElement: any): IVirtualNode {
        const attributes: IAttribute = {};

        const elementAttributes = Array.from(domElement.attributes);
        elementAttributes.forEach((el: any) => {
            attributes[el.name] = el.value
        });

        const DOMTree: IVirtualNode = {
            nodeTypeCode: 'node',
            tagName: domElement.nodeName,
            attributes: attributes,
            childNodes: []
        };

        const elementNodes = Array.from(domElement.childNodes);
        elementNodes.forEach((el: any) => {
            let newElemInfo: any = {}

            if (el.nodeType == 3) {
                newElemInfo.nodeTypeCode = 'text';
                newElemInfo.textContent = el.textContent;
                newElemInfo.childNodes = [];
            } else {
                newElemInfo = this.createDOMTreeFromDOM(el);
            }
            DOMTree.childNodes.push(newElemInfo)
        });

        return DOMTree;
    }

    getFragment(): HTMLElement {
        return this.fragment;
    }

    setProps(nextProps: any): void {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

}