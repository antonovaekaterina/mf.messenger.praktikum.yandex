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

        const nestedComponents = {
            form: new Form({
                name: 'RegistrationForm',
                formInner: new RegistrationFormInner().getFragment()
            }).getFragment()
        };
        return createRenderContent(source, this.props, nestedComponents)
    }
}

