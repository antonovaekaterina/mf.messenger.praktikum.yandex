import {chatAPIInstance, IAddUsersData, ICreateChatData} from '../api/chatAPI';
import {store} from '../index';
import {openNotification} from '../core/Store/actions/notification';
import {setChats, setActiveChatUsers, setActiveChat} from '../core/Store/actions/chat';
import ChatType from '../types/ChatType';
import UserType from '../types/UserType';
import {closeModal} from '../core/Store/actions/modal';
import Service from './Service';

class ChatService extends Service {
    createChat(data: ICreateChatData) {
        return chatAPIInstance.createChat(data)
            .then((result: any) => {
                if (this.hasError(result.status)) {
                    throw this.makeErrorDescription(result);
                }
                store.dispatch(openNotification('CreateChatSuccessNotification', {text: 'Чат успешно создан'}))
                return this.getChats();
            })
            .catch(err => {
                store.dispatch(openNotification('CreateChatErrorNotification', {text: err}))
                console.error(err)
            })
    }

    getChats() {
        return chatAPIInstance.getChats()
            .then((result: any) => {
                if (this.hasError(result.status)) {
                    throw this.makeErrorDescription(result);
                }

                const chats:ChatType[] = JSON.parse(result.response);
                store.dispatch(setChats(chats));

                return result;
            })
            .catch(err => {
                store.dispatch(openNotification('GetChatErrorNotification', {text: err}))
                console.error(err)
            })
    }

    addUsers(data: IAddUsersData) {
        return chatAPIInstance.addUsers(data)
            .then((result: any) => {
                if (this.hasError(result.status)) {
                    throw this.makeErrorDescription(result);
                }
                store.dispatch(openNotification('AddUsersSuccessNotification', {text: 'Пользователи добавлены успешно'}))

                return this.getUsers(data.chatId);
            })
            .catch(err => {
                store.dispatch(openNotification('AddUserErrorNotification', {text: err}))
                console.error(err)
            })
    }

    deleteUsers(data: IAddUsersData, isOwner?: boolean) {
        return chatAPIInstance.deleteUsers(data)
            .then((result: any) => {
                if (this.hasError(result.status)) {
                    throw this.makeErrorDescription(result);
                }
                store.dispatch(openNotification('DeleteUsersSuccessNotification', {text: 'Пользователь удален из беседы'}))

                if (isOwner) {
                    store.dispatch(closeModal('RemoveUserModal'));
                    store.dispatch(setActiveChat(null));
                    this.getChats();

                } else {
                    return this.getUsers(data.chatId);
                }
            })
            .catch(err => {
                store.dispatch(openNotification('DeleteUserErrorNotification', {text: err}))
                console.error(err)
            })
    }

    getUsers(id: number) {
        return chatAPIInstance.getUsers(id)
            .then((result: any) => {
                if (this.hasError(result.status)) {
                    throw this.makeErrorDescription(result);
                }

                const users:UserType[] = JSON.parse(result.response);
                store.dispatch(setActiveChatUsers(users));

                return result;
            })
            .catch(err => {
                store.dispatch(openNotification('GetUsersErrorNotification', {text: err}))
                console.error(err)
            })
    }

    refreshAvatar(form: any) {
        const formData = new FormData(form);
        const activeChatId = store.getState().chat.activeChat.id;
        formData.append('chatId', activeChatId);

        return chatAPIInstance.avatar(formData)
            .then((result: any) => {
                if (this.hasError(result.status)) {
                    throw this.makeErrorDescription(result);
                }

                store.dispatch(openNotification('RefreshChatAvatarNotification', {text: 'Аватар успешно изменен'}))

                this.getChats().then(() => {
                    const activeChat = store.getState().chat.chatList.find((item:any) => item.id === activeChatId);
                    store.dispatch(setActiveChat(activeChat || null));
                });

                return result;
            })
            .catch(err => {
                store.dispatch(openNotification('RefreshChatAvatarErrorNotification', {text: err}))
                console.error(err)
            })
    }
}

export const chatServiceInstance = new ChatService();