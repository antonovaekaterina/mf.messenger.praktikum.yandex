import UserType from '../../../types/UserType.js';
import ChatType from '../../../types/ChatType.js';

export const TYPE_SET_CHATS = 'set-chats';
export const TYPE_SET_ACTIVE_CHAT = 'set-active-chat';
export const TYPE_SET_ACTIVE_CHAT_USERS = 'set-active-chat-id';

export const setChats = (chats: ChatType[]) => ({
    type: TYPE_SET_CHATS,
    value: chats
});

export const setActiveChat = (chat: ChatType | null) => ({
    type: TYPE_SET_ACTIVE_CHAT,
    value: chat
});

export const setActiveChatUsers = (users: UserType[]) => ({
    type: TYPE_SET_ACTIVE_CHAT_USERS,
    value: users
});

