import BasicAPI from "./BasicAPI.js";
import { chatHTTPInstance } from "../components/HTTP/HTTP.js";
class ChatAPI extends BasicAPI {
    getChats() {
        return chatHTTPInstance.get('', {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    createChat(data) {
        return chatHTTPInstance.post('', {
            data: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    avatar(form) {
        const formData = new FormData(form);
        return chatHTTPInstance.put('/avatar', {
            data: formData,
        });
    }
    addUsers(data) {
        return chatHTTPInstance.put('/users', {
            data: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    deleteUsers(data) {
        return chatHTTPInstance.delete('/users', {
            data: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    getUsers(id) {
        return chatHTTPInstance.get(`/${id}/users`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
export const chatAPIInstance = new ChatAPI();
//# sourceMappingURL=chatAPI.js.map