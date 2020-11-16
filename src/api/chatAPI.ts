import BasicAPI from "./BasicAPI.js";
import {chatHTTPInstance} from "./HTTP/HTTP.js";

export interface ICreateChatData {
    title: string,
}

export interface IAddUsersData {
    users: number[],
    chatId: any
}

class ChatAPI extends BasicAPI {
    getChats() {
        return chatHTTPInstance.get('', {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    createChat(data:ICreateChatData) {
        return chatHTTPInstance.post('', {
            data: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    avatar(formData: any) {
        return chatHTTPInstance.put('/avatar', {
            data: formData,
        });
    }

    addUsers(data: IAddUsersData) {
        return chatHTTPInstance.put('/users', {
            data: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    deleteUsers(data: IAddUsersData) {
        return chatHTTPInstance.delete('/users', {
            data: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    getUsers(id: number) {
        return chatHTTPInstance.get(`/${id}/users`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}

export const chatAPIInstance = new ChatAPI();