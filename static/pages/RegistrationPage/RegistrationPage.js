import Block from "../../components/Block/Block.js";
import RegistrationForm from "./views/RegistrationForm.js";
import renderDOM, { createRenderContent } from "../../scripts/utils.js";
export default class RegistrationPage extends Block {
    render() {
        const source = (`<section class="RegistrationPage">
                <div class="container-fluid">
                    <span class="component" id="registrationForm"></span>
                </div>
            </section>`);
        const nestedComponents = {
            registrationForm: new RegistrationForm({}, 'RegistrationPage__wrap').getFragment()
        };
        return createRenderContent(source, this.props, nestedComponents);
    }
}
const registrationPage = new RegistrationPage();
renderDOM('.root', registrationPage.getFragment());
//# sourceMappingURL=RegistrationPage.js.map