import Router from './core/router/Router/Router.js';
import LoginPage from './pages/LoginPage/LoginPage.js';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage.js';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.js';
import ErrorPage from './pages/ErrorPage/ErrorPage.js';
import ChatPage from './pages/ChatPage/ChatPage.js';
import ProfilePage from './pages/ProfilePage/ProfilePage.js';
import Store from './core/Store/Store.js';
import reducer from './core/Store/reducers/index.js';
import {authServiceInstance} from './services/authService.js';

export const store = new Store(reducer);
export const router = new Router('.root');

export const ROOT = '/';
export const ROUTE_PROFILE = '/profile/';
export const ROUTE_LOGIN = '/login/';
export const ROUTE_REGISTRATION = '/registration/';
export const ROUTE_NOT_FOUND = '/not-found/';
export const ROUTE_ERROR = '/not-found/';

router
    .use(ROOT, ChatPage)
    .use(ROUTE_PROFILE, ProfilePage)
    .use(ROUTE_LOGIN, LoginPage)
    .use(ROUTE_REGISTRATION, RegistrationPage)
    .use(ROUTE_NOT_FOUND, NotFoundPage)
    .use(ROUTE_ERROR, ErrorPage)
    .start();

//authServiceInstance.logout();
authServiceInstance.init();