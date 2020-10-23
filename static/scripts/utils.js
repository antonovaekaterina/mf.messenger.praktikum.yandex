export default (rootSelector = 'root', node) => {
    const root = document.querySelector(rootSelector);
    if (!root)
        return;
    root.append(node);
};
export const createRenderContent = (source, props, nestedComponents = {}) => {
    const template = window.Handlebars.compile(source);
    return {
        html: template(props),
        nestedComponents
    };
};
//# sourceMappingURL=utils.js.map