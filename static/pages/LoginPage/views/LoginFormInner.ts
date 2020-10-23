import Block from "../../../components/Block/Block.js";
import InputField from "../../../components/InputField/InputField.js";
import Button from "../../../components/Button/Button.js";
import {createRenderContent} from "../../../scripts/utils.js";

export default class LoginFormInner extends Block {
    render() {
        const fields = [
            {
                attribute: 'login',
                type: 'text',
                label: 'Логин'
            },
            {
                attribute: 'password',
                type: 'password',
                label: 'Пароль'
            },
        ];

        const source = (
            `<div class="LoginFormInner">
                <span class="component" id="inputList"></span>
                <a href="#" class="LoginFormInner__forgot-password">Забыли пароль?</a>
                <span class="component" id="button"></span>
                <a class="LoginFormInner__sigh-in" href="./registration.html">Зарегистрироваться</a>
            </div>`
        );

        const nestedComponents = {
            inputList: fields.map(field => new InputField(field).getFragment()),
            button: new Button({label: 'Войти'}).getFragment()
        };

        return createRenderContent(source, this.props, nestedComponents);
    }
}

