import {IAction, StateType} from "../components/Store/types";
import notification from "./notification.js";
import modal from "./modal.js";
import user from "./user.js";

export default (state: StateType, action?: IAction):StateType => ({
    user: user(state.user, action),
    chats: null,
    modals: modal(state.modal, action),
    notifications: notification(state.notification, action)
})