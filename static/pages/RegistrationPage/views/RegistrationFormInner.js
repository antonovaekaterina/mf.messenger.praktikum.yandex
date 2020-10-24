import Block from "../../../components/Block/Block.js";
import InputField from "../../../components/InputField/InputField.js";
import Button from "../../../components/Button/Button.js";
import { createRenderContent } from "../../../scripts/utils.js";
export default class RegistrationFormInner extends Block {
    render() {
        const source = (`<div name="RegistrationFormInner">
                <span class="component" id="inputList"></span>
                <span class="component" id="button"></span>
                <a class="RegistrationFormInner__login" href="./login.html">Вход</a>
            </div>`);
        const nestedComponents = {
            inputList: this.props.fields.map((field) => new InputField(Object.assign({ errors: this.props.formErrors && this.props.formErrors[field.attribute] }, field)).getFragment()),
            button: new Button({ label: 'Зарегистрироваться' }).getFragment()
        };
        return createRenderContent(source, this.props, nestedComponents);
    }
}
//# sourceMappingURL=RegistrationFormInner.js.map