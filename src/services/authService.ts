import {authAPIInstance, ISignInData, ISignUpData} from '../api/authAPI';
import {router, store, ROOT, ROUTE_LOGIN, ROUTE_REGISTRATION} from '../index';
import {setUser} from '../core/Store/actions/auth';
import {openNotification} from '../core/Store/actions/notification';
import {chatServiceInstance} from './chatService';
import {setActiveChat, setChats} from '../core/Store/actions/chat';
import Service from './Service';

class AuthService extends Service {
    signUp(data: ISignUpData) {
        return authAPIInstance.signUp(data)
            .then((result: any) => {
                if (this.hasError(result.status)) {
                    throw this.makeErrorDescription(result);
                }

                return result;
            })
            .then(() => {
                return authAPIInstance.getUser();
            })
            .then((result: any) => {
                if (this.hasError(result.status)) {
                    throw this.makeErrorDescription(result.status);
                }

                this.setUser(result);

                return result;
            })
            .catch(err => {
                store.dispatch(openNotification('SignUpErrorNotification', {text: err}));
                console.error(err);
            });
    }

    signIn(data: ISignInData) {
        return authAPIInstance.signIn(data)
            .then((result: any) => {
                if (this.hasError(result.status)) {
                    throw this.makeErrorDescription(result);
                }

                return result;
            })
            .then(() => {
                return authAPIInstance.getUser();
            })
            .then((result: any) => {
                if (this.hasError(result.status)) {
                    throw this.makeErrorDescription(result.status);
                }

                this.setUser(result);
                return result;
            })
            .catch(err => {
                console.error(err);
                store.dispatch(openNotification('SignInErrorNotification', {text: err}));
            });
    }

    logout() {
        return authAPIInstance.logout()
            .then((result: any) => {
                if (this.hasError(result.status)) {
                    throw this.makeErrorDescription(result);
                }

                store.dispatch(setUser(null));
                store.dispatch(setChats([]));
                store.dispatch(setActiveChat(null));
                router.go(ROUTE_LOGIN);
                return result;
            })
            .catch(err => {
                store.dispatch(openNotification('LogoutErrorNotification', {text: err}));
                console.error(err);
            });
    }

    init() {
        return authAPIInstance.getUser()
            .then((result: any) => {
                if (this.hasError(result.status)) {
                    throw this.makeErrorDescription(result);
                }

                this.setUser(result);

                return result;
            })
            .catch(err => {
                console.error(err);
                store.dispatch(openNotification('InitErrorNotification', {text: err}));
                if (!this.isAuthPage()) {
                    router.go(ROUTE_LOGIN);
                }
            });
    }

    setUser(result: any) {
        const user = JSON.parse(result.response);
        store.dispatch(setUser(user));
        chatServiceInstance.getChats();
        if (this.isAuthPage()) {
            router.go(ROOT);
        }
    }

    isAuthPage() {
        return (window.location.pathname === ROUTE_LOGIN || window.location.pathname === ROUTE_REGISTRATION);
    }
}

export const authServiceInstance = new AuthService();
