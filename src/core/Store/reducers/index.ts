import {IAction, StateType} from '../types';
import notification from './notification';
import modal from './modal';
import user from './user';
import chats from './chats';

export default (state: StateType, action?: IAction):StateType => ({
    user: user(state.user, action),
    chat: chats(state.chat, action),
    modals: modal(state.modals, action),
    notifications: notification(state.notifications, action)
})