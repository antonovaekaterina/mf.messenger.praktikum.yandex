import { TYPE_SET_ACTIVE_CHAT_USERS, TYPE_SET_CHATS, TYPE_SET_ACTIVE_CHAT } from "../actions/chat.js";
const initialChatState = {
    chatList: [],
    activeChat: null
};
export default (state = initialChatState, action) => {
    if (!action) {
        return state;
    }
    switch (action.type) {
        case TYPE_SET_CHATS:
            return Object.assign(Object.assign({}, state), { chatList: action.value });
        case TYPE_SET_ACTIVE_CHAT:
            return Object.assign(Object.assign({}, state), { activeChat: action.value
                    ? Object.assign(Object.assign({}, (state.activeChat || {})), action.value) : null });
        case TYPE_SET_ACTIVE_CHAT_USERS:
            return Object.assign(Object.assign({}, state), { activeChat: Object.assign(Object.assign({}, (state.activeChat || {})), { users: action.value }) });
        default:
            return state;
    }
};
//# sourceMappingURL=chats.js.map