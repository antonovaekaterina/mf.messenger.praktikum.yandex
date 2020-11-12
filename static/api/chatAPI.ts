import BasicAPI from "./BasicAPI.js";
import {chatHTTPInstance} from "../components/HTTP/HTTP.js";

export interface ICreateChatData {
    title: string,
}

export interface IAddUsersData {
    users: number[],
    chatId: number
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

    avatar(form: any) {
        const formData = new FormData(form);

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