import EventBus from '../EventBus/EventBus';
import Block from '../../components/Block/Block';
import {IAction, ReducerType, StateType} from './types';

export default class Store {
    private static __instance: Store;
    protected state: StateType;
    private eventBus: EventBus;
    private reducer: ReducerType

    static EVENTS = {
        STORE_UPDATE: 'Store-did-update'
    }

    constructor(reducer: ReducerType, initialState: StateType = {}) {
        if (Store.__instance) {
            return Store.__instance;
        }

        this.reducer = reducer;
        this.state = this.makeStateProxy(reducer(initialState));
        this.eventBus = new EventBus();

        Store.__instance = this;
    }

    private makeStateProxy<T extends StateType>(state: T): T {
        return new Proxy(state, {
            set: (target: any, name: string, value: any) => {
                target[name] = value;
                this.eventBus.emit(Store.EVENTS.STORE_UPDATE, target);
                return true;
            },
            deleteProperty() {
                throw new Error('Нет доступа');
            }
        });
    }

    subscribe<T extends Block<any>>(block: T, mapStateToProps: (state: StateType) => any) {
        const handler = (state: StateType) => {
            const newProps = mapStateToProps(state)
            block.setProps(newProps);
        }
        this.eventBus.on(Store.EVENTS.STORE_UPDATE, handler);
        handler(this.getState());
    }

    getState():StateType {
        return this.state;
    }

    dispatch(action: IAction) {
        const newState = this.reducer(this.getState(), action);
        this.update(newState);
    }

    update(newState: StateType) {
        if (!newState) {
            return;
        }

        Object.assign(this.state, newState);
    }
}