import {userAPIInstance, IProfileData, IPasswordData, ISearchData} from '../api/userAPI.js';
import {store} from '../index.js';
import {setUser} from "../core/Store/actions/auth.js";
import {openNotification} from "../core/Store/actions/notification.js";
import Service from "./Service.js";

class UserService extends Service {

    refreshProfile(data: IProfileData) {
        return userAPIInstance.profile(data)
            .then((result: any) => {
                if (this.hasError(result.status)) {
                    throw this.makeErrorDescription(result);
                }

                this.setUser(result);
                store.dispatch(openNotification('RefreshProfileErrorNotification', {text: 'Информация успешно обновлена'}))
                return result;
            })
            .catch(err => {
                store.dispatch(openNotification('RefreshProfileErrorNotification', {text: err}))
                console.error(err)
            })
    }

    refreshPassword(data: IPasswordData) {
        return userAPIInstance.password(data)
            .then((result: any) => {
                if (this.hasError(result.status)) {
                    throw this.makeErrorDescription(result);
                }
                store.dispatch(openNotification('RefreshProfileErrorNotification', {text: 'Пароль успешно изменен'}))
                return result;
            })
            .catch(err => {
                store.dispatch(openNotification('RefreshPasswordErrorNotification', {text: err}))
                console.error(err)
            })
    }

    refreshAvatar(form: any) {
        return userAPIInstance.avatar(form)
            .then((result: any) => {
                if (this.hasError(result.status)) {
                    throw this.makeErrorDescription(result);
                }

                this.setUser(result);
                store.dispatch(openNotification('RefreshProfileErrorNotification', {text: 'Аватар успешно изменен'}))
                return result;
            })
            .catch(err => {
                store.dispatch(openNotification('RefreshAvatarErrorNotification', {text: err}))
                console.error(err)
            })
    }

    searchUser(data: ISearchData) {
        return userAPIInstance.search(data)
            .then((result: any) => {
                if (this.hasError(result.status)) {
                    throw this.makeErrorDescription(result);
                }

                return JSON.parse(result.response);
            })
            .catch(err => {
                store.dispatch(openNotification('RefreshProfileErrorNotification', {text: err}))
                console.error(err)
            })
    }

    setUser(result: any) {
        const newUser = JSON.parse(result.response);
        const oldUser = store.getState().user;
        store.dispatch(setUser({...oldUser, ...newUser}));
    }
}

export const userServiceInstance = new UserService();