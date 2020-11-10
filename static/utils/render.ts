export interface IRenderContent {
    html: string,
}

export interface ICreateNestedComponent {
    component: any,
    getProps: () => any
}

export default (rootSelector: string = '.root', node: HTMLElement): void => {
    const root: HTMLElement | null = document.querySelector(rootSelector);
    if (!root) return;
    root.append(node);
};

export const unmountDOM = (node: HTMLElement): void => {
    node.remove();
}

export const createRenderContent = (source: string, props: Record<string, any>):IRenderContent => {
    const template = window.Handlebars.compile(source);

    return {
        html: template(props),
    }
};

export const createNestedComponent = (Constructor: any, getProps: (key?:string) => any, className?: string):ICreateNestedComponent => {
    return {
        component: new Constructor(getProps(), className),
        getProps,
    }
};



