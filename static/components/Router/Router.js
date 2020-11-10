import Route from "../Route/Route.js";
export default class Router {
    constructor(rootSelector) {
        if (Router.__instance) {
            return Router.__instance;
        }
        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootSelector = rootSelector;
        Router.__instance = this;
    }
    use(pathname, block, props = {}, className) {
        const route = new Route(pathname, block, props, this._rootSelector, className);
        this.routes.push(route);
        return this;
    }
    start() {
        window.onpopstate = ((event) => {
            // @ts-ignore
            this._onRoute(event.currentTarget.location.pathname);
        }).bind(this);
        this._onRoute(window.location.pathname);
    }
    _onRoute(pathname) {
        if (this._currentRoute) {
            this._currentRoute.leave();
            this._currentRoute = null;
        }
        const route = this.getRoute(pathname);
        if (route) {
            this._currentRoute = route;
            route.render();
        }
    }
    go(pathname) {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }
    back() {
        this.history.back();
    }
    forward() {
        this.history.forward();
    }
    getRoute(pathname) {
        return this.routes.find(route => route.match(pathname));
    }
}
//# sourceMappingURL=Router.js.map