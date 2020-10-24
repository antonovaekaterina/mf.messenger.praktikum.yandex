import Block from "../../../components/Block/Block.js";
import Form from "../../../components/Form/Form.js";
import LoginFormInner from "./LoginFormInner.js";
import {createRenderContent} from "../../../scripts/utils.js";

export default class LoginForm extends Block {
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

        const fields = [
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
        ];

        const nestedComponents = {
            form: new Form({
                name: 'LoginForm',
                FormInner: LoginFormInner,
                fields
            }).getFragment()
        };
        return createRenderContent(source, this.props, nestedComponents)
    }
}

