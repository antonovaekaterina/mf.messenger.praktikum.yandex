import Block from "../../../components/Block/Block.js";
import Form from "../../../components/Form/Form.js";
import LoginFormInner from "./LoginFormInner.js";
import { createRenderContent } from "../../../scripts/utils.js";
export default class LoginForm extends Block {
    render() {
        const source = (`<div class="LoginForm">
                <div class="LoginForm__title">
                    <h1>Вход</h1>
                    <div class="Icon"></div>
                </div>
                <span class="component" id="form"></span>
          </div>`);
        const nestedComponents = {
            form: new Form({
                name: 'LoginForm',
                formInner: new LoginFormInner().getFragment()
            }).getFragment()
        };
        return createRenderContent(source, this.props, nestedComponents);
    }
}
//# sourceMappingURL=LoginForm.js.map