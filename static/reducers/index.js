import notification from "./notification.js";
import modal from "./modal.js";
import user from "./user.js";
import chats from "./chats.js";
export default (state, action) => ({
    user: user(state.user, action),
    chat: chats(state.chat, action),
    modals: modal(state.modals, action),
    notifications: notification(state.notifications, action)
});
//# sourceMappingURL=index.js.map