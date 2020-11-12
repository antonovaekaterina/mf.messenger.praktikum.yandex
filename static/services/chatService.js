import { chatAPIInstance } from '../api/chatAPI.js';
import { store } from '../index.js';
import { openNotification } from "../actions/notification.js";
import { setChats, setActiveChatUsers, setActiveChat } from "../actions/chat.js";
import { closeModal } from "../actions/modal.js";
class ChatService {
    createChat(data) {
        return chatAPIInstance.createChat(data)
            .then((result) => {
            if (this.hasError(result.status)) {
                throw this.makeErrorDescription(result);
            }
            store.dispatch(openNotification('CreateChatSuccessNotification', { text: 'Чат успешно создан' }));
            return this.getChats();
        })
            .catch(err => {
            store.dispatch(openNotification('CreateChatErrorNotification', { text: err }));
            console.error(err);
        });
    }
    getChats() {
        return chatAPIInstance.getChats()
            .then((result) => {
            if (this.hasError(result.status)) {
                throw this.makeErrorDescription(result);
            }
            const chats = JSON.parse(result.response);
            store.dispatch(setChats(chats));
            return result;
        })
            .catch(err => {
            store.dispatch(openNotification('GetChatErrorNotification', { text: err }));
            console.error(err);
        });
    }
    addUsers(data) {
        return chatAPIInstance.addUsers(data)
            .then((result) => {
            if (this.hasError(result.status)) {
                throw this.makeErrorDescription(result);
            }
            store.dispatch(openNotification('AddUsersSuccessNotification', { text: 'Пользователи добавлены успешно' }));
            return this.getUsers(data.chatId);
        })
            .catch(err => {
            store.dispatch(openNotification('AddUserErrorNotification', { text: err }));
            console.error(err);
        });
    }
    deleteUsers(data, isOwner) {
        return chatAPIInstance.deleteUsers(data)
            .then((result) => {
            if (this.hasError(result.status)) {
                throw this.makeErrorDescription(result);
            }
            store.dispatch(openNotification('DeleteUsersSuccessNotification', { text: 'Пользователь удален из беседы' }));
            if (isOwner) {
                store.dispatch(closeModal('RemoveUserModal'));
                store.dispatch(setActiveChat(null));
                this.getChats();
            }
            else {
                return this.getUsers(data.chatId);
            }
        })
            .catch(err => {
            store.dispatch(openNotification('DeleteUserErrorNotification', { text: err }));
            console.error(err);
        });
    }
    getUsers(id) {
        return chatAPIInstance.getUsers(id)
            .then((result) => {
            if (this.hasError(result.status)) {
                throw this.makeErrorDescription(result);
            }
            const users = JSON.parse(result.response);
            store.dispatch(setActiveChatUsers(users));
            return result;
        })
            .catch(err => {
            store.dispatch(openNotification('GetUsersErrorNotification', { text: err }));
            console.error(err);
        });
    }
    refreshAvatar(form) {
        const formData = new FormData(form);
        const activeChatId = store.getState().chat.activeChat.id;
        formData.append('chatId', activeChatId);
        return chatAPIInstance.avatar(formData)
            .then((result) => {
            if (this.hasError(result.status)) {
                throw this.makeErrorDescription(result);
            }
            store.dispatch(openNotification('RefreshChatAvatarNotification', { text: 'Аватар успешно изменен' }));
            this.getChats().then(() => {
                const activeChat = store.getState().chat.chatList.find((item) => item.id === activeChatId);
                store.dispatch(setActiveChat(activeChat || null));
            });
            return result;
        })
            .catch(err => {
            store.dispatch(openNotification('RefreshChatAvatarErrorNotification', { text: err }));
            console.error(err);
        });
    }
    hasError(status) {
        return status !== 200;
    }
    makeErrorDescription(result) {
        let reason;
        if (result.response && (typeof result.response === 'string')) {
            const response = JSON.parse(result.response);
            reason = response.reason;
        }
        return new Error(`Ответ от сервера: ${result.status} | ${reason}`);
    }
}
export const chatServiceInstance = new ChatService();
//# sourceMappingURL=chatService.js.map