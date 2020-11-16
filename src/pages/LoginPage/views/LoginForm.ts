import Block from "../../../components/Block/Block.js";
import Form from "../../../components/Form/Form.js";
import LoginFormInner from "./LoginFormInner.js";
import {createNestedComponent, createRenderContent} from "../../../utils/render.js";
import {ILoginForm} from '../type.js';
import {authServiceInstance} from '../../../services/authService.js';
import {ISignUpData} from '../../../api/authAPI.js';

export default class LoginForm extends Block<ILoginForm> {
    constructor(props: ILoginForm, className: string) {
        super(props, className);
    }

    createNestedComponents() {
        this.nestedComponents = {
            form: createNestedComponent(Form, () => ({
                name: 'LoginForm',
                FormInner: LoginFormInner,
                fields: [
                    {
                        attribute: 'login',
                        type: 'text',
                        label: 'Логин',
                        validationParams: ['required']
                    },
                    {
                        attribute: 'password',
                        type: 'password',
                        label: 'Пароль',
                        validationParams: ['required']
                    },
                ],
                onSubmit: this.onSubmit
            }))
        }
    }

    onSubmit(formValues: ISignUpData) {
        authServiceInstance.signIn(formValues);
    }

    render() {
        const source:string = (
            `<div class="LoginForm">
                <div class="LoginForm__title">
                    <h1>Вход</h1>
                    <div class="Icon"></div>
                </div>
                <span class="component" id="form"></span>
          </div>`
        );

        return createRenderContent(source, this.props)
    }
}

