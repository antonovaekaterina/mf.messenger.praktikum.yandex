import EventBus from '../EventBus/index.js';
export default class Block {
    constructor(props = {}, className) {
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
    componentDidMount() {
    }
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
        const keysOldProps = Object.keys(oldProps);
        const keysNewProps = Object.keys(newProps);
        if (keysOldProps.length !== keysNewProps.length) {
            return true;
        }
        return keysOldProps.some((key) => newProps[key] !== oldProps[key]);
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
                if (curEl.nodeTypeCode == newEl.nodeTypeCode) {
                    if (curEl.nodeTypeCode == 'text') {
                        if (curEl.textContent !== newEl.textContent) {
                            documentFragmentNode.childNodes[k].textContent = newEl.textContent;
                        }
                    }
                    else if (curEl.nodeTypeCode == 'node') {
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
                        }
                        else {
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
                }
                else {
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
            else {
                let newNode;
                if (newEl.nodeTypeCode == 'text') {
                    newNode = document.createTextNode(newEl.textContent ? newEl.textContent : '');
                }
                else {
                    newNode = document.createElement(newEl.tagName);
                    for (let attrKey in newEl.attributes) {
                        newNode.setAttribute(attrKey, newEl.attributes[attrKey]);
                    }
                }
                documentFragmentNode.appendChild(newNode);
            }
            if (newEl.nodeTypeCode == 'node' && newEl.childNodes) {
                const curDocumentFragmentNode = documentFragmentNode.childNodes[k];
                let oldChildNodes = [];
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
    getNestedComponent(id) {
        return this.nestedComponents[id];
    }
    // @ts-ignore
    render() {
    }
    createDOMTreeFromDOM(domElement) {
        const attributes = {};
        const elementAttributes = Array.from(domElement.attributes);
        elementAttributes.forEach((el) => {
            attributes[el.name] = el.value;
        });
        const DOMTree = {
            nodeTypeCode: 'node',
            tagName: domElement.nodeName,
            attributes: attributes,
            childNodes: []
        };
        const elementNodes = Array.from(domElement.childNodes);
        elementNodes.forEach((el) => {
            let newElemInfo = {};
            if (el.nodeType == 3) {
                newElemInfo.nodeTypeCode = 'text';
                newElemInfo.textContent = el.textContent;
                newElemInfo.childNodes = [];
            }
            else {
                newElemInfo = this.createDOMTreeFromDOM(el);
            }
            DOMTree.childNodes.push(newElemInfo);
        });
        return DOMTree;
    }
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
}
Block.EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_RENDER: 'flow:render',
    FLOW_CDU: 'flow:component-did-update',
};
//# sourceMappingURL=Block.js.map