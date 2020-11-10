import renderDOM, { unmountDOM } from "../../utils/render.js";
import Layout from "../Layout/Layout.js";
export default class Route {
    constructor(pathname, view, props, rootSelector, className) {
        this._pathname = pathname;
        this._blockConstructor = view;
        this._block = null;
        this._props = props;
        this._className = className;
        this._rootSelector = rootSelector;
    }
    navigate(pathname) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }
    leave() {
        if (this._block) {
            unmountDOM(this._block.getFragment());
        }
    }
    match(pathname) {
        return pathname === this._pathname;
    }
    render() {
        if (!this._block) {
            this._block = new Layout({
                innerComponent: this._blockConstructor,
                innerComponentProps: this._props,
                innerComponentClassName: this._className
            });
        }
        renderDOM(this._rootSelector, this._block.getFragment());
    }
}
//# sourceMappingURL=Route.js.map