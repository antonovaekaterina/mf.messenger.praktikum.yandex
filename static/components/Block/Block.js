import EventBus from '../EventBus/index.js';
export default class Block {
    constructor(props = {}, className) {
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
                const nestedComponent = nestedComponentConfig.component;
                const newNestedComponentProps = nestedComponentConfig.getProps();
                console.log('setprops', nestedComponent, newNestedComponentProps);
                if (!Array.isArray(nestedComponent)) {
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
}
Block.EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_RENDER: 'flow:render',
    FLOW_CDU: 'flow:component-did-update',
};
//# sourceMappingURL=Block.js.map