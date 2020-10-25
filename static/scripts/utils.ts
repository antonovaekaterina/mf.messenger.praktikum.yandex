export default (rootSelector: string = 'root', node: HTMLElement): void => {
    const root: HTMLElement | null = document.querySelector(rootSelector);
    if (!root) return;
    root.append(node);
};

export interface IRenderContent {
    html: string,
}
export const createRenderContent = (source: string, props: any):IRenderContent => {
    const template = window.Handlebars.compile(source);

    return {
        html: template(props),
    }
};

export interface ICreateNestedComponent {
    component: any,
    getProps: () => any
}
export const createNestedComponent = (Constructor: any, getProps: (key?:string) => any, className?: string):ICreateNestedComponent => {
    return {
        component: new Constructor(getProps(), className),
        getProps,
    }
};



