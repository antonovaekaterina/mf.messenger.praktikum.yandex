import {authAPIInstance, ISignInData, ISignUpData} from "../api/authAPI.js";
import {router, store, ROOT, ROUTE_LOGIN, ROUTE_REGISTRATION} from "../index.js";
import {setUser} from "../actions/auth.js";

class AuthService {

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
            .catch(err => console.error(err))
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
            .catch(err => console.error(err))
    }

    logout() {
        return authAPIInstance.logout()
            .then((result: any) => {
                if (this.hasError(result.status)) {
                    throw this.makeErrorDescription(result);
                }

                store.dispatch(setUser(null));
                router.go(ROUTE_LOGIN);
                return result;
            })
            .catch(err => console.error(err))
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
                if (!this.isAuthPage()) {
                    router.go(ROUTE_LOGIN)
                }
            })
    }

    setUser(result: any) {
        const user = JSON.parse(result.response);
        store.dispatch(setUser(user));
        console.log(store)
        if (this.isAuthPage()) {
            router.go(ROOT);
        }
    }

    isAuthPage() {
        return (window.location.pathname === ROUTE_LOGIN || window.location.pathname === ROUTE_REGISTRATION);
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

export const authServiceInstance = new AuthService();