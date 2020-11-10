import BasicAPI from "./BasicAPI.js";
import { userHTTPInstance } from "../components/HTTP/HTTP.js";
class UserAPI extends BasicAPI {
    profile(data) {
        return userHTTPInstance.put('/profile', {
            data: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    password(data) {
        return userHTTPInstance.put('/password', {
            data: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    avatar(form) {
        const formData = new FormData(form);
        return userHTTPInstance.put('/profile/avatar', {
            data: formData,
        });
    }
}
export const userAPIInstance = new UserAPI();
//# sourceMappingURL=userAPI.js.map