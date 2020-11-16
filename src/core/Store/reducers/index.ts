import {IAction, StateType} from "../types";
import notification from "./notification.js";
import modal from "./modal.js";
import user from "./user.js";
import chats from "./chats.js";

export default (state: StateType, action?: IAction):StateType => ({
    user: user(state.user, action),
    chat: chats(state.chat, action),
    modals: modal(state.modals, action),
    notifications: notification(state.notifications, action)
})