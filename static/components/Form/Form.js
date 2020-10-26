import Block from "../Block/Block.js";
import FormView from "./FormView.js";
import { createRenderContent, createNestedComponent } from "../../scripts/utils.js";
import { validate } from "../../scripts/validate.js";
export default class Form extends Block {
    constructor(props) {
        super(props);
    }
    createNestedComponents() {
        this.nestedComponents = {
            formView: createNestedComponent(FormView, () => (Object.assign(Object.assign({}, this.props), { onSubmit: (e) => this.onSubmit(e) })))
        };
    }
    onSubmit(e) {
        e.preventDefault();
        const form = e.target;
        if (this.props.onSubmit) {
            this.props.onSubmit(form);
        }
        this.logFormValues(form === null || form === void 0 ? void 0 : form.elements);
        this.validate(form);
    }
    validate(form) {
        const fields = [...(this.props.fields || []), ...(this.props.commonFields || []), ...(this.props.passwordFields || [])];
        const formErrors = fields.reduce((errorObj, field) => {
            const formElement = form.querySelector(`[name=${field.attribute}]`);
            errorObj[field.attribute] = validate(field.validationParams, field.attribute, formElement.value);
            return errorObj;
        }, {});
        this.setProps({ formErrors });
    }
    logFormValues(formElements) {
        const formValues = Array.from(formElements).reduce((obj, element) => {
            if (element.name) {
                obj[element.name] = element.value;
            }
            return obj;
        }, {});
        console.log(formValues);
    }
    render() {
        const source = '<span class="component" id="formView"></span>';
        return createRenderContent(source, this.props);
    }
}
//# sourceMappingURL=Form.js.map