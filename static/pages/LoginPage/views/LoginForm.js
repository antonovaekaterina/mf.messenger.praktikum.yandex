import Block from "../../../components/Block/Block.js";
import Form from "../../../components/Form/Form.js";
import LoginFormInner from "./LoginFormInner.js";
import { createNestedComponent, createRenderContent } from "../../../utils/render.js";
import { authServiceInstance } from '../../../services/authService.js';
export default class LoginForm extends Block {
    constructor(props, className) {
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
        };
    }
    onSubmit(formValues) {
        authServiceInstance.signIn(formValues);
    }
    render() {
        const source = (`<div class="LoginForm">
                <div class="LoginForm__title">
                    <h1>Вход</h1>
                    <div class="Icon"></div>
                </div>
                <span class="component" id="form"></span>
          </div>`);
        return createRenderContent(source, this.props);
    }
}
//# sourceMappingURL=LoginForm.js.map