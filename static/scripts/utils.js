export default (rootSelector = 'root', node) => {
    const root = document.querySelector(rootSelector);
    if (!root)
        return;
    root.append(node);
};
export const createRenderContent = (source, props) => {
    const template = window.Handlebars.compile(source);
    return {
        html: template(props),
    };
};
export const createNestedComponent = (Constructor, getProps, className) => {
    return {
        component: new Constructor(getProps(), className),
        getProps,
    };
};
//# sourceMappingURL=utils.js.map