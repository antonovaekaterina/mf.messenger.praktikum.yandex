import ChatType from "../types/ChatType.js";
import {IAction} from "../components/Store/types.js";
import {TYPE_SET_ACTIVE_CHAT_USERS, TYPE_SET_CHATS, TYPE_SET_ACTIVE_CHAT} from "../actions/chat.js";
import UserType from "../types/UserType.js";

export interface IActiveChatState {
    id?: number,
    title?: string,
    avatar?: string,
    users?: UserType[]
}

export interface IChatState {
    chatList?: ChatType[],
    activeChat: IActiveChatState
}

const initialChatState = {
    chatList: [],
    activeChat: {}
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
                activeChat: {
                    ...state.activeChat,
                    ...action.value
                }
            }
        case TYPE_SET_ACTIVE_CHAT_USERS:
            return {
                ...state,
                activeChat: {
                    ...state.activeChat,
                    users: action.value,
                }
            }
        default:
            return state;
    }
}