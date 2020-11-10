import EventBus from "../EventBus/EventBus.js";
export default class Store {
    constructor(reducer, initialState = {}) {
        if (Store.__instance) {
            return Store.__instance;
        }
        this.reducer = reducer;
        this.state = this.makeStateProxy(reducer(initialState));
        this.eventBus = new EventBus();
        Store.__instance = this;
    }
    makeStateProxy(state) {
        const self = this;
        return new Proxy(state, {
            set(target, name, value) {
                target[name] = value;
                self.eventBus.emit(Store.EVENTS.STORE_UPDATE, target);
                return true;
            },
            deleteProperty() {
                throw new Error('Нет доступа');
            }
        });
    }
    subscribe(block, mapStateToProps) {
        const handler = (state) => {
            const newProps = mapStateToProps(state);
            block.setProps(newProps);
        };
        this.eventBus.on(Store.EVENTS.STORE_UPDATE, handler);
        handler(this.getState());
    }
    getState() {
        return this.state;
    }
    dispatch(action) {
        const newState = this.reducer(this.getState(), action);
        this.update(newState);
    }
    update(newState) {
        if (!newState) {
            return;
        }
        Object.assign(this.state, newState);
    }
}
Store.EVENTS = {
    STORE_UPDATE: 'store-did-update'
};
//# sourceMappingURL=Store.js.map