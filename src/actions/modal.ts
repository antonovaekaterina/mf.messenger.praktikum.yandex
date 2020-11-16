import {ComponentType} from "../components/Block/types.js";

export const TYPE_OPEN_MODAL = 'open-modal';
export const TYPE_CLOSE_MODAL = 'close-modal';

export const openModal = (id: string | number, component: ComponentType<any>, props: Record<string, any> = {}) => ({
    type: TYPE_OPEN_MODAL,
    props,
    id,
    component
});

export const closeModal = (id: string | number) => ({
    type: TYPE_CLOSE_MODAL,
    id
});