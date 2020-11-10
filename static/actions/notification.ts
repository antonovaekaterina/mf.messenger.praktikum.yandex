import {ComponentType} from "../components/Block/types.js";

export const TYPE_OPEN_NOTIFICATION = 'open-notification';
export const TYPE_CLOSE_NOTIFICATION = 'close-notification';

export const openNotification = (id: string | number, component: ComponentType<any>, props: Record<string, any>) => ({
    type: TYPE_OPEN_NOTIFICATION,
    props,
    id,
    component
});

export const closeNotification = (id: string | number) => ({
    type: TYPE_CLOSE_NOTIFICATION,
    id
});