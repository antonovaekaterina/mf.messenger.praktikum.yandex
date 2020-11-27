import ChatType from '../../../types/ChatType';
import {IAction} from '../types';
import {TYPE_SET_ACTIVE_CHAT_USERS, TYPE_SET_CHATS, TYPE_SET_ACTIVE_CHAT} from '../actions/chat';
import UserType from '../../../types/UserType';

export interface IActiveChatState extends ChatType {
    users?: UserType[]
}

export interface IChatState {
    chatList: ChatType[],
    activeChat: IActiveChatState | null
}

const initialChatState = {
    chatList: [],
    activeChat: null
}

export default (state: IChatState = initialChatState, action?: IAction) => {
    if (!action) {
        return state;
    }

    switch (action.type) {
        case TYPE_SET_CHATS:
            return {
                ...state,
                chatList: action.value
            }
        case TYPE_SET_ACTIVE_CHAT:
            return {
                ...state,
                activeChat: action.value
                    ? {...(state.activeChat || {}), ...action.value}
                    : null
            }
        case TYPE_SET_ACTIVE_CHAT_USERS:
            return {
                ...state,
                activeChat: {
                    ...(state.activeChat || {}),
                    users: action.value,
                }
            }
        default:
            return state;
    }
}