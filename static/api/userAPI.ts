import BasicAPI from "./BasicAPI.js";
import {userHTTPInstance} from "../components/HTTP/HTTP.js";

export interface IProfileData {
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    email: string,
    phone: string
}

export interface IPasswordData {
    oldPassword: string,
    newPassword: string
}

export interface IAvatarData {
    avatar: string,
}

class UserAPI extends BasicAPI {
    profile(data:IProfileData) {
        return userHTTPInstance.put('/profile', {
            data: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    password(data:IPasswordData) {
        return userHTTPInstance.put('/password', {
            data: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }


    avatar(form: any) {
        const formData = new FormData(form);

        return userHTTPInstance.put('/profile/avatar', {
            data: formData,
        });
    }
}

export const userAPIInstance = new UserAPI();