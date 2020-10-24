import Block from "../../../components/Block/Block.js";
import Form from "../../../components/Form/Form.js";
import {createRenderContent} from "../../../scripts/utils.js";
import RegistrationFormInner from './RegistrationFormInner.js';

export default class RegistrationForm extends Block {
    render() {
        const source:string = (
            `<div class="RegistrationForm">
                <div class="RegistrationForm__title">
                    <h1>Регистрация</h1>
                    <div class="Icon"></div>
                </div>
                <span class="component" id="form"></span>
            </div>`
        );

        const fields = [
            {
                attribute: 'first_name',
                type: 'text',
                label: 'Имя',
                validationParams: ['required']
            },
            {
                attribute: 'second_name',
                type: 'text',
                label: 'Фамилия',
                validationParams: ['required']
            },
            {
                attribute: 'email',
                type: 'email',
                label: 'Email',
                validationParams: ['required', 'email']
            },
            {
                attribute: 'phone',
                type: 'text',
                label: 'Номер телефона',
                validationParams: ['required', 'phoneNumber']
            },
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
                name: 'RegistrationForm',
                FormInner: RegistrationFormInner,
                fields
            }).getFragment()
        };
        return createRenderContent(source, this.props, nestedComponents)
    }
}

