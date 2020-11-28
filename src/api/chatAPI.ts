import BasicAPI from './BasicAPI';
import {chatHTTPInstance} from './HTTP/HTTP';

export interface ICreateChatData {
    title: string,
}

export interface IAddUsersData {
    users: number[],
    chatId: any
}

class ChatAPI extends BasicAPI {
    getChats() {
        return chatHTTPInstance.get();
    }

    createChat(data:ICreateChatData) {
        return chatHTTPInstance.post('', {
            data: JSON.stringify(data)
        });
    }

    avatar(formData: any) {
        return chatHTTPInstance.put('/avatar', {
            data: formData
        });
    }

    addUsers(data: IAddUsersData) {
        return chatHTTPInstance.put('/users', {
            data: JSON.stringify(data)
        });
    }

    deleteUsers(data: IAddUsersData) {
        return chatHTTPInstance.delete('/users', {
            data: JSON.stringify(data)
        });
    }

    getUsers(id: number) {
        return chatHTTPInstance.get(`/${id}/users`);
    }
}

export const chatAPIInstance = new ChatAPI();
