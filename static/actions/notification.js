export const TYPE_OPEN_NOTIFICATION = 'open-notification';
export const TYPE_CLOSE_NOTIFICATION = 'close-notification';
export const openNotification = (id, props) => ({
    type: TYPE_OPEN_NOTIFICATION,
    props,
    id,
});
export const closeNotification = (id) => ({
    type: TYPE_CLOSE_NOTIFICATION,
    id
});
//# sourceMappingURL=notification.js.map