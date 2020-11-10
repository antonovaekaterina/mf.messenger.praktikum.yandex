import Block from "../Block/Block.js";
import FormView from "./FormView.js";
import { createRenderContent, createNestedComponent } from "../../utils/render.js";
import { validate } from "../../utils/validate.js";
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
        const formValues = this.getFormValues(form.elements);
        this.logFormValues(formValues);
        const formIsValid = this.validate(form);
        if (formIsValid && this.props.onSubmit) {
            this.props.onSubmit(formValues, form);
        }
    }
    validate(form) {
        const formErrors = (this.props.fields || []).reduce((errorObj, field) => {
            const formElement = form.querySelector(`[name=${field.attribute}]`);
            const errorList = validate(field.validationParams, field.attribute, formElement.value);
            if (errorList.length) {
                errorObj[field.attribute] = errorList;
            }
            return errorObj;
        }, {});
        this.setProps({ formErrors });
        return !Object.keys(formErrors).length;
    }
    logFormValues(formValues) {
        console.log(formValues);
    }
    getFormValues(formElements) {
        return Array.from(formElements).reduce((obj, element) => {
            if (element.name) {
                obj[element.name] = element.value;
            }
            return obj;
        }, {});
    }
    render() {
        const source = '<span class="component" id="formView"></span>';
        return createRenderContent(source, this.props);
    }
}
//# sourceMappingURL=Form.js.map