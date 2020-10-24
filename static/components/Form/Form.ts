import {IForm} from './types.js';
import Block from "../Block/Block.js";
import FormView from "./FormView.js";
import {createRenderContent} from "../../scripts/utils.js";
import validate from "../../scripts/validate.js";

export default class Form extends Block {
    constructor(props: IForm) {
        super(props);
    }

    onSubmit(e: Event) {
        e.preventDefault();
        const form: any = e.target;

        if (this.props.onSubmit) {
            this.props.onSubmit(form);
        }

        this.logFormValues(form?.elements);

        this.validate(form);
    }

    validate(form: any) {
        const formErrors = this.props.fields.reduce((errorObj: any, field: any) => {
            const formElement = form.querySelector(`[name=${field.attribute}]`);
            errorObj[field.attribute] = validate(field.validationParams, field.attribute, formElement.value);
            return errorObj;
        }, {});

        this.setProps({formErrors});
    }

    logFormValues(formElements: HTMLFormElement[]) {
        const formValues: object = Array.from(formElements).reduce((obj: any, element: HTMLFormElement) => {
            if (element.name) {
                obj[element.name] = element.value;
            }

            return obj;
        }, {});

        console.log(formValues);
    }

    render() {
        const source:string = '<span class="component" id="formView"></span>';
        const nestedComponents = {
            formView: new FormView({
                ...this.props,
                onSubmit: (e) => this.onSubmit(e)
            }).getFragment()
        };

        return createRenderContent(source, this.props, nestedComponents);
    }
}