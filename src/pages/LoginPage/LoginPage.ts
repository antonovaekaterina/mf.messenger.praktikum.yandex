import Block from '../../components/Block/Block.js';
import LoginForm from './views/LoginForm.js';
import {createNestedComponent, createRenderContent} from '../../utils/render.js';
import {LoginPageType} from './type.js';

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
