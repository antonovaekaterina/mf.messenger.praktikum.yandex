import Route from "../Route/Route.js";
import Block from "../../../components/Block/Block.js";

export default class Router {
    private static __instance: Router;
    private routes: Route<any>[];
    private history: History;
    private _currentRoute: Route<any> | null;
    private _rootSelector: string;

    constructor(rootSelector: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootSelector = rootSelector;

        Router.__instance = this;
    }

    use<T extends Block<any>>(
        pathname: string,
        block: new (...args: any[]) => T,
        props: Record<string, any> = {},
        className?:string
    ):Router {
        const route = new Route(pathname, block, props, this._rootSelector, className);
        this.routes.push(route);
        return this;
    }

    start() {
        window.onpopstate = ((event: Event) => {
            // @ts-ignore
            this._onRoute(event.currentTarget.location.pathname);
        }).bind(this);

        this._onRoute(window.location.pathname);
    }

    private _onRoute(pathname: string) {
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

    go(pathname: string) {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    back() {
        this.history.back()
    }

    forward() {
        this.history.forward();
    }

    getRoute(pathname: string) {
        return this.routes.find(route => route.match(pathname));
    }
}
