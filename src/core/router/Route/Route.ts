import Block from '../../../components/Block/Block.js';
import renderDOM, {unmountDOM} from '../../../utils/render.js';
import Layout from '../../../components/Layout/Layout.js';

export default class Route<T extends Block<any>> {
    private _pathname: string;
    private _blockConstructor: new (...args: any[]) => T;
    private _block: Layout | null;
    private _props: Record<string, any>;
    private _className?: string;
    private _rootSelector: string;

    constructor(
        pathname: string,
        view: new (...args: any[]) => T,
        props: Record<string, any>,
        rootSelector: string,
        className?: string,
    ) {
        this._pathname = pathname;
        this._blockConstructor = view;
        this._block = null;
        this._props = props;
        this._className = className;
        this._rootSelector = rootSelector;
    }

    navigate(pathname: string):void {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave():void {
        if (this._block) {
            unmountDOM(this._block.getFragment());
        }
    }

    match(pathname: string):boolean {
        return pathname === this._pathname;
    }

    render():void {
        if (!this._block) {
            this._block = new Layout({
                innerComponent: this._blockConstructor,
                innerComponentProps: this._props,
                innerComponentClassName: this._className
            })
        }

        renderDOM(this._rootSelector, this._block.getFragment());
    }
}