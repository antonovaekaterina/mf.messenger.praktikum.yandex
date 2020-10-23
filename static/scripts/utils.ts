export default (rootSelector: string = 'root', node: DocumentFragment): void => {
    const root: HTMLElement | null = document.querySelector(rootSelector);
    if (!root) return;
    root.append(node);
};

export interface IRenderContent {
    html: string,
    nestedComponents: any
}
export const createRenderContent = (source: string, props: any, nestedComponents: any = {}):IRenderContent => {
    const template = window.Handlebars.compile(source);

    return {
        html: template(props),
        nestedComponents
    }
};