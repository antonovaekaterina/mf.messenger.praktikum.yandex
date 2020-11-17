import BasicAPI from './BasicAPI.js';
import {authHTTPInstance} from './HTTP/HTTP.js';

export interface ISignUpData {
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    password: string,
    phone: string
}

export interface ISignInData {
    login: string,
    password: string
}

class AuthAPI extends BasicAPI {
    signUp(data:ISignUpData) {
        return authHTTPInstance.post('/signup', {
            data: JSON.stringify(data)
        });
    }

    signIn(data:ISignInData) {
        return authHTTPInstance.post('/signin', {
            data: JSON.stringify(data)
        });
    }

    logout() {
        return authHTTPInstance.post('/logout');
    }

    getUser() {
        return authHTTPInstance.get('/user');
    }
}

export const authAPIInstance = new AuthAPI();