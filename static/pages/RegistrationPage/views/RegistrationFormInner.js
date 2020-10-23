import Block from "../../../components/Block/Block.js";
import InputField from "../../../components/InputField/InputField.js";
import Button from "../../../components/Button/Button.js";
import { createRenderContent } from "../../../scripts/utils.js";
export default class RegistrationFormInner extends Block {
    render() {
        const fields = [
            {
                attribute: 'first_name',
                type: 'text',
                label: 'Имя'
            },
            {
                attribute: 'second_name',
                type: 'text',
                label: 'Фамилия'
            },
            {
                attribute: 'email',
                type: 'email',
                label: 'Email'
            },
            {
                attribute: 'phone',
                type: 'text',
                label: 'Номер телефона'
            },
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
        const source = (`<div name="RegistrationFormInner">
                <span class="component" id="inputList"></span>
                <span class="component" id="button"></span>
                <a class="RegistrationFormInner__login" href="./login.html">Вход</a>
            </div>`);
        const nestedComponents = {
            inputList: fields.map(field => new InputField(field).getFragment()),
            button: new Button({ label: 'Зарегистрироваться' }).getFragment()
        };
        return createRenderContent(source, this.props, nestedComponents);
    }
}
//# sourceMappingURL=RegistrationFormInner.js.map