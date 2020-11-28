import {userAPIInstance, IProfileData, IPasswordData, ISearchData} from '../api/userAPI';
import {store} from '../index';
import {setUser} from '../core/Store/actions/auth';
import {openNotification} from '../core/Store/actions/notification';
import Service from './Service';

class UserService extends Service {
    refreshProfile(data: IProfileData) {
        return userAPIInstance.profile(data)
            .then((result: any) => {
                if (this.hasError(result.status)) {
                    throw this.makeErrorDescription(result);
                }

                this.setUser(result);
                store.dispatch(openNotification({text: 'Информация успешно обновлена'}));
                return result;
            })
            .catch(err => {
                store.dispatch(openNotification({text: err}));
                console.error(err);
            });
    }

    refreshPassword(data: IPasswordData) {
        return userAPIInstance.password(data)
            .then((result: any) => {
                if (this.hasError(result.status)) {
                    throw this.makeErrorDescription(result);
                }

                store.dispatch(openNotification({text: 'Пароль успешно изменен'}));
                return result;
            })
            .catch(err => {
                store.dispatch(openNotification({text: err}));
                console.error(err);
            });
    }

    refreshAvatar(form: any) {
        return userAPIInstance.avatar(form)
            .then((result: any) => {
                if (this.hasError(result.status)) {
                    throw this.makeErrorDescription(result);
                }

                this.setUser(result);
                store.dispatch(openNotification({text: 'Аватар успешно изменен'}));
                return result;
            })
            .catch(err => {
                store.dispatch(openNotification({text: err}));
                console.error(err);
            });
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
                store.dispatch(openNotification({text: err}));
                console.error(err);
            });
    }

    setUser(result: any) {
        const newUser = JSON.parse(result.response);
        const oldUser = store.getState().user;
        store.dispatch(setUser({...oldUser, ...newUser}));
    }
}

export const userServiceInstance = new UserService();
