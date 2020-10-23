import EventBus from '../EventBus/index.js';
import {IEventBusOutput} from '../EventBus/types.js';

export default class Block {
    private fragment: DocumentFragment;
    readonly props: any;
    private eventBus: IEventBusOutput;
    private content: any;

    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_RENDER: 'flow:render',
        FLOW_CDU: 'flow:component-did-update',
    };

    constructor(props: any = {}) {
        this.props = this.makePropsProxy(props);
        this.eventBus = new EventBus();
        
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
        this.eventBus.emit(Block.EVENTS.FLOW_CDM, this.props);
    }

    private createResources(): void {
        this.fragment = new DocumentFragment();
    }

    private _componentDidMount(): void {
        this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
        this.componentDidMount();
    }

    componentDidMount(): void {}

    private _componentDidUpdate(oldProps: any, newProps: any): void {
        const componentShouldUpdate:boolean = this.componentDidUpdate(oldProps, newProps);
        if (componentShouldUpdate) {
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

        const divHelper: HTMLElement = document.createElement('div');
        divHelper.innerHTML = this.content.html;
        this.fragment.append(...Array.from(divHelper.children));

        const nestedComponentElements: any = Array.from(this.fragment.querySelectorAll('.component'));
        nestedComponentElements.forEach((el: any) => {
            const component = this.content.nestedComponents[el.id];
            el.replaceWith(...(Array.isArray(component) ? component : [component]))
        })
    }

    render() {}

    getFragment(): DocumentFragment {
        return this.fragment;
    }

    getContent():string {
        return this.content;
    }

    setProps(nextProps: any): void {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

}