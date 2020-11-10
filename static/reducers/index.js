import notification from "./notification.js";
import modal from "./modal.js";
import user from "./user.js";
export default (state, action) => ({
    user: user(state.user, action),
    chats: null,
    modals: modal(state.modal, action),
    notifications: notification(state.notification, action)
});
//# sourceMappingURL=index.js.map