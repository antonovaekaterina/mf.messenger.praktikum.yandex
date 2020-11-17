import Block from '../../components/Block/Block.js';
import {IHeader} from './type.js'
import User from '../User/User.js';
import {createNestedComponent, createRenderContent} from '../../utils/render.js';
import {ROOT, ROUTE_PROFILE, router, store} from '../../index.js';
import {authServiceInstance} from '../../services/authService.js';

export default class Header extends Block<IHeader> {
    constructor(props: IHeader) {
        super(props);
    }

    createNestedComponents() {
        this.nestedComponents = {
            user: createNestedComponent(User, () => ({
                user: this.props.user
            }))
        }
    }

    componentDidMount() {
        store.subscribe(this, (state) => ({
            user: state.user
        }))

        const root = this.getFragment();

        const elemProfileLink = root.querySelector('.Header__settings');
        if (elemProfileLink) {
            elemProfileLink.addEventListener('click', this.handleProfileClick)
        }

        const elemBackBtn = root.querySelector('.Header__back-btn');
        if (elemBackBtn) {
            elemBackBtn.addEventListener('click', this.handleBackBtnClick)
        }

        const elemLogoutBtn = root.querySelector('.Header__logout');
        if (elemLogoutBtn) {
            elemLogoutBtn.addEventListener('click', this.handleLogoutBtn)
        }
    }

    handleProfileClick(e: Event) {
        e.preventDefault();
        router.go(ROUTE_PROFILE);
    }

    handleBackBtnClick(e: Event) {
        e.preventDefault();
        router.go(ROOT);
    }

    handleLogoutBtn(e: Event) {
        e.preventDefault();
        authServiceInstance.logout();
    }

    render() {
        const source:string = (
            `<header class='Header'>
                <div class='container-fluid'>
                    <nav>
                        {{#if isProfilePage}}
                            <a class='Header__back-btn Header__link' href='#'>
                                <div class='Icon'></div><span class='Header__settings-label'>Вернуться к чатам</span>
                            </a>
                            <a href='#' class='Header__link Header__logout'>Выйти</a>
                        {{else}}
                            <span class='component' id='user'></span>
                            <a class='Header__settings Header__link' href='#'>
                                <div class='Icon'></div>
                                <span class='Header__settings-label'>Профиль</span>
                            </a>
                        {{/if}}
                    </nav>
                </div>
            </header>`
        );

        return createRenderContent(source, this.props);
    }
}