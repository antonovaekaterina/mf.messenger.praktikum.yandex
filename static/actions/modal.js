export const TYPE_OPEN_MODAL = 'open-modal';
export const TYPE_CLOSE_MODAL = 'close-modal';
export const openModal = (id, component, props = {}) => ({
    type: TYPE_OPEN_MODAL,
    props,
    id,
    component
});
export const closeModal = (id) => ({
    type: TYPE_CLOSE_MODAL,
    id
});
//# sourceMappingURL=modal.js.map