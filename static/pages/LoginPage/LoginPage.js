import Block from "../../components/Block/Block.js";
import LoginForm from "./views/LoginForm.js";
import renderDOM, { createRenderContent } from "../../scripts/utils.js";
export default class LoginPage extends Block {
    render() {
        const source = (`<section class="LoginPage">
                <div class="container-fluid">
                    <span class="component" id="loginForm"></span>
                </div>
            </section>`);
        const nestedComponents = {
            loginForm: new LoginForm({}, 'LoginPage__wrap').getFragment()
        };
        return createRenderContent(source, this.props, nestedComponents);
    }
}
const loginPage = new LoginPage();
renderDOM('.root', loginPage.getFragment());
//# sourceMappingURL=LoginPage.js.map