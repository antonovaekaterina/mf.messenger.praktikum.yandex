import EventBus from '../EventBus/index.js';
import {IEventBusOutput} from '../EventBus/types.js';
import {IRenderContent} from '../../scripts/utils.js'

export default class Block {
    private fragment: HTMLElement;
    readonly props: any;
    private eventBus: IEventBusOutput;
    private content: IRenderContent;
    readonly className: string;
    nestedComponents: any;

    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_RENDER: 'flow:render',
        FLOW_CDU: 'flow:component-did-update',
    };

    constructor(props: any = {}, className?: any) {
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

    componentDidMount(): void {}

    private _componentDidUpdate(oldProps: any, newProps: any): void {
        const componentShouldUpdate:boolean = this.componentDidUpdate(oldProps, newProps);
        if (componentShouldUpdate) {
            //перерендеринг вложенных компонентов
            Object.keys(this.nestedComponents).forEach((id:string) => {
                const nestedComponentConfig = this.getNestedComponent(id);

                const nestedComponent = nestedComponentConfig.component;
                const newNestedComponentProps = nestedComponentConfig.getProps();
                console.log('setprops', nestedComponent, newNestedComponentProps)

                if (!Array.isArray(nestedComponent)) {
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
    }

    getNestedComponent(id: string) {
        return this.nestedComponents[id];
    }

    // @ts-ignore
    render():IRenderContent {}

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