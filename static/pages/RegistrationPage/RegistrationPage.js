import Block from "../../components/Block/Block.js";
import RegistrationForm from "./views/RegistrationForm.js";
import { createNestedComponent, createRenderContent } from "../../utils/render.js";
export default class RegistrationPage extends Block {
    constructor(props) {
        super(props);
    }
    createNestedComponents() {
        this.nestedComponents = {
            registrationForm: createNestedComponent(RegistrationForm, () => ({}), 'RegistrationPage__wrap')
        };
    }
    render() {
        const source = (`<section class="RegistrationPage">
                <div class="container-fluid">
                    <span class="component" id="registrationForm"></span>
                </div>
            </section>`);
        return createRenderContent(source, this.props);
    }
}
//# sourceMappingURL=RegistrationPage.js.map