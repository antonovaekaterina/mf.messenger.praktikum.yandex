import Block from '../../../components/Block/Block.js';
import Form from '../../../components/Form/Form.js';
import {createNestedComponent, createRenderContent} from '../../../utils/render.js';
import RegistrationFormInner from './RegistrationFormInner.js';
import {IRegistrationForm} from '../type.js';
import {ISignUpData} from '../../../api/authAPI.js';
import {authServiceInstance} from '../../../services/authService.js';

export default class RegistrationForm extends Block<IRegistrationForm> {
    constructor(props: IRegistrationForm, className: string) {
        super(props, className);
    }

    createNestedComponents() {
        this.nestedComponents = {
            form: createNestedComponent(Form, () => ({
                name: 'RegistrationForm',
                FormInner: RegistrationFormInner,
                fields: [
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
                ],
                onSubmit: this.onSubmit
            }))
        }
    }

    onSubmit(formValues: ISignUpData) {
        authServiceInstance.signUp(formValues);
    }

    render() {
        const source:string = (
            `<div class='RegistrationForm'>
                <div class='RegistrationForm__title'>
                    <h1>Регистрация</h1>
                    <div class='Icon'></div>
                </div>
                <span class='component' id='form'></span>
            </div>`
        );

        return createRenderContent(source, this.props)
    }
}

