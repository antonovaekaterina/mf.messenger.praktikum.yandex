import BasicAPI from "./BasicAPI.js";
import {authHTTPInstance} from "../components/HTTP/HTTP.js";

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
    password: string,
}

class AuthAPI extends BasicAPI {
    signUp(data:ISignUpData) {
        return authHTTPInstance.post('/signup', {
            data: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    signIn(data:ISignInData) {
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