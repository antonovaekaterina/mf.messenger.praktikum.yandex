import Block from "../../components/Block/Block.js";
import LoginForm from "./views/LoginForm.js";
import renderDOM, {createRenderContent} from "../../scripts/utils.js";

export default class LoginPage extends Block {
    render() {
        const source:string = (
            `<section class="LoginPage">
                <div class="container-fluid">
                    <div class="LoginPage__wrap">
                        <span class="component" id="loginForm"></span>
                    </div>
                </div>
            </section>`
        );

        const nestedComponents = {
            loginForm: new LoginForm().getFragment()
        };
        return createRenderContent(source, this.props, nestedComponents)
    }
}

const loginPage = new LoginPage();

renderDOM('.root', loginPage.getFragment());
