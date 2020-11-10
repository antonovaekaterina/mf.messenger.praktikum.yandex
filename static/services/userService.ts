import {userAPIInstance, IProfileData, IPasswordData} from '../api/userAPI.js';
import {store} from '../index.js';
import {setUser} from "../actions/auth.js";

class UserService {

    refreshProfile(data: IProfileData) {
        return userAPIInstance.profile(data)
            .then((result: any) => {
                if (this.hasError(result.status)) {
                    throw this.makeErrorDescription(result);
                }

                this.setUser(result);
                return result;
            })
            .catch(err => console.error(err))
    }

    refreshPassword(data: IPasswordData) {
        return userAPIInstance.password(data)
            .then((result: any) => {
                if (this.hasError(result.status)) {
                    throw this.makeErrorDescription(result);
                }

                return result;
            })
            .catch(err => console.error(err))
    }

    refreshAvatar(form: any) {
        return userAPIInstance.avatar(form)
            .then((result: any) => {
                if (this.hasError(result.status)) {
                    throw this.makeErrorDescription(result);
                }

                this.setUser(result);
                return result;
            })
            .catch(err => console.error(err))
    }

    setUser(result: any) {
        const newUser = JSON.parse(result.response);
        const oldUser = store.getState().user;
        store.dispatch(setUser({...oldUser, ...newUser}));
        console.log(store)
    }

    hasError(status: number) {
        return status !== 200;
    }

    makeErrorDescription(result: any) {
        let reason: string | undefined;

        if (result.response && (typeof result.response === 'string')) {
            const response = JSON.parse(result.response)
            reason = response.reason;
        }
        return new Error(`Ответ от сервера: ${result.status} | ${reason}`);
    }
}

export const userServiceInstance = new UserService();