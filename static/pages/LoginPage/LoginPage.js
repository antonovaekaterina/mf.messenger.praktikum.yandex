import Block from "../../components/Block/Block.js";
import LoginForm from "./views/LoginForm.js";
import renderDOM, { createNestedComponent, createRenderContent } from "../../scripts/utils.js";
export default class LoginPage extends Block {
    constructor(props, className) {
        super(props, className);
    }
    createNestedComponents() {
        this.nestedComponents = {
            loginForm: createNestedComponent(LoginForm, () => ({}), 'LoginPage__wrap')
        };
    }
    render() {
        const source = (`<section class="LoginPage">
                <div class="container-fluid">
                    <span class="component" id="loginForm"></span>
                </div>
            </section>`);
        return createRenderContent(source, this.props);
    }
}
const loginPage = new LoginPage();
renderDOM('.root', loginPage.getFragment());
//# sourceMappingURL=LoginPage.js.map