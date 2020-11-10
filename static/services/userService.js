import { userAPIInstance } from '../api/userAPI.js';
import { store } from '../index.js';
import { setUser } from "../actions/auth.js";
import { openNotification } from "../actions/notification.js";
class UserService {
    refreshProfile(data) {
        return userAPIInstance.profile(data)
            .then((result) => {
            if (this.hasError(result.status)) {
                throw this.makeErrorDescription(result);
            }
            this.setUser(result);
            store.dispatch(openNotification('RefreshProfileErrorNotification', { text: 'Информация успешно обновлена' }));
            return result;
        })
            .catch(err => {
            store.dispatch(openNotification('RefreshProfileErrorNotification', { text: err }));
            console.error(err);
        });
    }
    refreshPassword(data) {
        return userAPIInstance.password(data)
            .then((result) => {
            if (this.hasError(result.status)) {
                throw this.makeErrorDescription(result);
            }
            store.dispatch(openNotification('RefreshProfileErrorNotification', { text: 'Пароль успешно изменен' }));
            return result;
        })
            .catch(err => {
            store.dispatch(openNotification('RefreshPasswordErrorNotification', { text: err }));
            console.error(err);
        });
    }
    refreshAvatar(form) {
        return userAPIInstance.avatar(form)
            .then((result) => {
            if (this.hasError(result.status)) {
                throw this.makeErrorDescription(result);
            }
            this.setUser(result);
            store.dispatch(openNotification('RefreshProfileErrorNotification', { text: 'Аватар успешно изменен' }));
            return result;
        })
            .catch(err => {
            store.dispatch(openNotification('RefreshAvatarErrorNotification', { text: err }));
            console.error(err);
        });
    }
    setUser(result) {
        const newUser = JSON.parse(result.response);
        const oldUser = store.getState().user;
        store.dispatch(setUser(Object.assign(Object.assign({}, oldUser), newUser)));
        console.log(store);
    }
    hasError(status) {
        return status !== 200;
    }
    makeErrorDescription(result) {
        let reason;
        if (result.response && (typeof result.response === 'string')) {
            const response = JSON.parse(result.response);
            reason = response.reason;
        }
        return new Error(`Ответ от сервера: ${result.status} | ${reason}`);
    }
}
export const userServiceInstance = new UserService();
//# sourceMappingURL=userService.js.map