import Block from '../../../components/Block/Block';
import Form from '../../../components/Form/Form';
import LoginFormInner from './LoginFormInner';
import {createNestedComponent, createRenderContent} from '../../../utils/render';
import {LoginFormType} from '../type';
import {authServiceInstance} from '../../../services/authService';
import {ISignUpData} from '../../../api/authAPI';
import './LoginForm.scss';

export default class LoginForm extends Block<LoginFormType> {
    /* eslint no-useless-constructor: "off" */
    constructor(props: LoginFormType, className: string) {
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
                    }
                ],
                onSubmit: this.onSubmit
            }))
        };
    }

    onSubmit(formValues: ISignUpData) {
        authServiceInstance.signIn(formValues);
    }

    render() {
        const source:string = (
            `<div class='LoginForm'>
                <div class='LoginForm__title'>
                    <h1>Вход</h1>
                    <div class='Icon'></div>
                </div>
                <span class='component' id='form'></span>
          </div>`
        );

        return createRenderContent(source, this.props);
    }
}

