import Block from '../../components/Block/Block';
import LoginForm from './views/LoginForm';
import {createNestedComponent, createRenderContent} from '../../utils/render';
import {LoginPageType} from './type';
import './LoginPage.scss';

export default class LoginPage extends Block<LoginPageType> {
    constructor(props: LoginPageType) {
        super(props);
    }

    createNestedComponents() {
        this.nestedComponents = {
            loginForm: createNestedComponent(LoginForm, () => ({}), 'LoginPage__wrap')
        }
    }

    render() {
        const source:string = (
            `<section class='LoginPage'>
                <div class='container-fluid'>
                    <span class='component' id='loginForm'></span>
                </div>
            </section>`
        );

        return createRenderContent(source, this.props)
    }
}
