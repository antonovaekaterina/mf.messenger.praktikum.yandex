import Block from "../Block/Block.js";
import FormView from "./FormView.js";
import { createRenderContent } from "../../scripts/utils.js";
export default class Form extends Block {
    constructor(props) {
        super(props);
    }
    onSubmit(e) {
        e.preventDefault();
        const form = e.target;
        if (this.props.onSubmit) {
            this.props.onSubmit(form);
        }
        this.logFormValues(form);
    }
    logFormValues(form) {
        const formElements = Array.from(form.elements);
        const formValues = formElements.reduce((obj, element) => {
            if (element.name) {
                obj[element.name] = element.value;
            }
            return obj;
        }, {});
        console.log(formValues);
    }
    render() {
        const source = '<span class="component" id="formView"></span>';
        const nestedComponents = {
            formView: new FormView(Object.assign(Object.assign({}, this.props), { onSubmit: (e) => this.onSubmit(e) })).getFragment()
        };
        return createRenderContent(source, this.props, nestedComponents);
    }
}
//# sourceMappingURL=Form.js.map