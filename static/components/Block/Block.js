import EventBus from '../EventBus/index.js';
export default class Block {
    constructor(props = {}) {
        this.props = this.makePropsProxy(props);
        this.eventBus = new EventBus();
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
        this.eventBus.emit(Block.EVENTS.FLOW_CDM, this.props);
    }
    createResources() {
        this.fragment = new DocumentFragment();
    }
    _componentDidMount() {
        this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
        this.componentDidMount();
    }
    componentDidMount() { }
    _componentDidUpdate(oldProps, newProps) {
        const componentShouldUpdate = this.componentDidUpdate(oldProps, newProps);
        if (componentShouldUpdate) {
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
        const divHelper = document.createElement('div');
        divHelper.innerHTML = this.content.html;
        this.fragment.append(...Array.from(divHelper.children));
        const nestedComponentElements = Array.from(this.fragment.querySelectorAll('.component'));
        nestedComponentElements.forEach((el) => {
            const component = this.content.nestedComponents[el.id];
            el.replaceWith(...(Array.isArray(component) ? component : [component]));
        });
    }
    render() { }
    getFragment() {
        return this.fragment;
    }
    getContent() {
        return this.content;
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