export const TYPE_SET_CHATS = 'set-chats';
export const TYPE_SET_ACTIVE_CHAT = 'set-active-chat';
export const TYPE_SET_ACTIVE_CHAT_USERS = 'set-active-chat-id';
export const setChats = (chats) => ({
    type: TYPE_SET_CHATS,
    value: chats
});
export const setActiveChat = (chat) => ({
    type: TYPE_SET_ACTIVE_CHAT,
    value: chat
});
export const setActiveChatUsers = (users) => ({
    type: TYPE_SET_ACTIVE_CHAT_USERS,
    value: users
});
//# sourceMappingURL=chat.js.map