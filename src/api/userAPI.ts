import BasicAPI from "./BasicAPI.js";
import {userHTTPInstance} from "./HTTP/HTTP.js";

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

export interface ISearchData {
    login: string,
}

class UserAPI extends BasicAPI {
    profile(data:IProfileData) {
        return userHTTPInstance.put('/profile', {
            data: JSON.stringify(data)
        });
    }

    password(data:IPasswordData) {
        return userHTTPInstance.put('/password', {
            data: JSON.stringify(data)
        });
    }


    avatar(form: any) {
        const formData = new FormData(form);

        return userHTTPInstance.put('/profile/avatar', {
            data: formData,
        });
    }

    search(data: ISearchData) {
        return userHTTPInstance.post('/search', {
            data: JSON.stringify(data)
        });
    }
}

export const userAPIInstance = new UserAPI();