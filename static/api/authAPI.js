import BasicAPI from "./BasicAPI.js";
import { authHTTPInstance } from "../components/HTTP/HTTP.js";
class AuthAPI extends BasicAPI {
    signUp(data) {
        return authHTTPInstance.post('/signup', {
            data: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    signIn(data) {
        return authHTTPInstance.post('/signin', {
            data: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    logout() {
        return authHTTPInstance.post('/logout', {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    getUser() {
        return authHTTPInstance.get('/user', {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
export const authAPIInstance = new AuthAPI();
//# sourceMappingURL=authAPI.js.map