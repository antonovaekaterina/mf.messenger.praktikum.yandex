import EventBus from '../EventBus/index.js';
import isEqual from "../../utils/isEqual.js";
export default class Block {
    constructor(props, className) {
        this.currentDomTree = [];
        this.props = this.makePropsProxy(props);
        this.eventBus = new EventBus();
        this.className = className;
        this.registerEvents();
        this.eventBus.emit(Block.EVENTS.INIT);
    }
    makePropsProxy(props) {
        const self = this;
        return new Proxy(props, {
            set(target, name, value) {
                const oldProps = Object.assign({}, target);
                target[name] = value;
                self.eventBus.emit(Block.EVENTS.FLOW_CDU, oldProps, target);
                return true;
            },
            deleteProperty() {
                throw new Error('Нет доступа');
            }
        });
    }
    registerEvents() {
        this.eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        this.eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        this.eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
        this.eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    }
    init() {
        this.createResources();
        this.createNestedComponents();
        this.eventBus.emit(Block.EVENTS.FLOW_CDM, this.props);
    }
    createResources() {
        this.fragment = document.createElement('div');
        this.fragment.classList.add('Block');
        if (this.className) {
            this.fragment.classList.add(this.className);
        }
    }
    createNestedComponents() {
        this.nestedComponents = {};
    }
    _componentDidMount() {
        this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
        this.componentDidMount();
    }
    componentDidMount() { }
    _componentDidUpdate(oldProps, newProps) {
        const componentShouldUpdate = this.componentDidUpdate(oldProps, newProps);
        if (componentShouldUpdate) {
            //перерендеринг вложенных компонентов
            Object.keys(this.nestedComponents).forEach((id) => {
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
    componentDidUpdate(oldProps, newProps) {
        return !isEqual(oldProps, newProps);
    }
    _render() {
        this.content = this.render();
        const doc = new DOMParser().parseFromString(this.content.html, "text/html");
        const newDomTree = this.createDOMTreeFromDOM(doc.body).childNodes;
        if (!this.currentDomTree.length) {
            this.fragment.innerHTML = this.content.html;
            //замена вложенных компонентов
            const nestedComponentsElements = Array.from(this.fragment.querySelectorAll('.component'));
            nestedComponentsElements.forEach((nestedElement) => {
                let nestedComponent;
                const dataIndex = nestedElement.dataset.index;
                if (dataIndex !== undefined) {
                    nestedComponent = this.getNestedComponent(nestedElement.id)[dataIndex].component;
                }
                else {
                    nestedComponent = this.getNestedComponent(nestedElement.id).component;
                }
                let componentNodes = nestedComponent.getFragment();
                nestedElement.replaceWith(componentNodes);
            });
        }
        else {
            const startDocumentFragmentNode = this.fragment;
            this.domApplyChanges(this.currentDomTree, newDomTree, startDocumentFragmentNode);
        }
        this.currentDomTree = newDomTree;
    }
    domApplyChanges(oldDomTree, newDomTree, documentFragmentNode) {
        for (let k = 0; k < newDomTree.length; k++) {
            const curEl = oldDomTree[k];
            const newEl = newDomTree[k];
            if (curEl) {
                switch (curEl.nodeTypeCode) {
                    case "node":
                        this.applyChangesForElement(curEl, newEl, documentFragmentNode.childNodes[k]);
                        break;
                    case "text":
                        this.applyChangesForTextNode(curEl, newEl, documentFragmentNode.childNodes[k]);
                        break;
                    default:
                        throw new Error('Нет обработчика для данного типа узла');
                }
            }
            else {
                this.appendNode(newEl, documentFragmentNode);
            }
            if (newEl.nodeTypeCode === 'node' && newEl.childNodes) {
                const curDocumentFragmentNode = documentFragmentNode.childNodes[k];
                let oldChildNodes = [];
                if (curEl && 'childNodes' in curEl) {
                    oldChildNodes = curEl.childNodes;
                }
                this.domApplyChanges(oldChildNodes, newEl.childNodes, curDocumentFragmentNode);
            }
        }
        this.removeOldNodes(oldDomTree, newDomTree, documentFragmentNode);
    }
    removeOldNodes(oldDomTree, newDomTree, documentFragmentNode) {
        for (let k = oldDomTree.length - 1; k >= newDomTree.length; k--) {
            documentFragmentNode.childNodes[k].remove();
        }
    }
    appendNode(newNode, documentFragmentNodeChildren, needReplace = false) {
        let newDocumentNode;
        if (newNode.nodeTypeCode === 'text') {
            newDocumentNode = document.createTextNode(newNode.textContent ? newNode.textContent : '');
        }
        else {
            newDocumentNode = document.createElement(newNode.tagName);
            for (const attrKey in newNode.attributes) {
                newDocumentNode.setAttribute(attrKey, newNode.attributes[attrKey]);
            }
        }
        if (needReplace) {
            documentFragmentNodeChildren.replaceWith(newDocumentNode);
        }
        else {
            documentFragmentNodeChildren.appendChild(newDocumentNode);
        }
    }
    applyChangesForTextNode(oldNode, newTextNode, documentFragmentNodeChildren) {
        if (oldNode.nodeTypeCode === 'text' && newTextNode.nodeTypeCode === 'text' && oldNode.textContent !== newTextNode.textContent) {
            documentFragmentNodeChildren.textContent = newTextNode.textContent;
        }
        else {
            this.appendNode(newTextNode, documentFragmentNodeChildren, true);
        }
    }
    applyChangesForElement(oldNode, newNode, documentFragmentNodeChildren) {
        if (oldNode.nodeTypeCode === 'node' && newNode.nodeTypeCode === 'node' && oldNode.tagName === newNode.tagName) {
            this.applyChangesForElementAttributes(oldNode, newNode, documentFragmentNodeChildren);
        }
        else {
            this.appendNode(newNode, documentFragmentNodeChildren, true);
        }
    }
    applyChangesForElementAttributes(oldNode, newNode, documentFragmentNodeChildren) {
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
    createDOMTreeFromDOM(domElement) {
        const elementAttributes = Array.from(domElement.attributes);
        //@ts-ignore
        const attributes = elementAttributes.reduce((acc, attribute) => {
            acc[attribute.name] = attribute.value;
            return acc;
        }, {});
        const DOMTree = {
            nodeTypeCode: 'node',
            tagName: domElement.nodeName,
            attributes: attributes,
            childNodes: []
        };
        const elementNodes = Array.from(domElement.childNodes);
        for (let k = 0; k < elementNodes.length; k++) {
            let newElemInfo = {};
            const el = elementNodes[k];
            if (el.nodeType == 3) {
                newElemInfo.nodeTypeCode = 'text';
                newElemInfo.textContent = el.textContent;
                newElemInfo.childNodes = [];
            }
            else {
                newElemInfo = this.createDOMTreeFromDOM(el);
            }
            DOMTree.childNodes.push(newElemInfo);
        }
        return DOMTree;
    }
    getNestedComponent(id) {
        return this.nestedComponents[id];
    }
    // @ts-ignore
    render() { }
    getFragment() {
        return this.fragment;
    }
    setProps(nextProps) {
        if (!nextProps) {
            return;
        }
        Object.assign(this.props, nextProps);
    }
    ;
    show() {
        this.fragment.style.display = '';
    }
    hide() {
        this.fragment.style.display = 'none';
    }
}
Block.EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_RENDER: 'flow:render',
    FLOW_CDU: 'flow:component-did-update',
};
//# sourceMappingURL=Block.js.map