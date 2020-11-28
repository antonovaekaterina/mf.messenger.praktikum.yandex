export const TYPE_OPEN_NOTIFICATION = 'open-notification';
export const TYPE_CLOSE_NOTIFICATION = 'close-notification';

let counter = 1;

export const openNotification = (props: Record<string, any>, id?: string | number) => {
    id = id || counter++;

    return {
        type: TYPE_OPEN_NOTIFICATION,
        props,
        id
    };
};

export const closeNotification = (id: string | number) => ({
    type: TYPE_CLOSE_NOTIFICATION,
    id
});
