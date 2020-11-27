import {IForm} from './types';
import Block from '../Block/Block';
import FormView from './FormView';
import {createRenderContent, createNestedComponent} from '../../utils/render';
import {validate} from '../../utils/validate';

export default class Form extends Block<IForm> {
    constructor(props: IForm) {
        super(props);
    }

    createNestedComponents() {
        this.nestedComponents = {
            formView: createNestedComponent(FormView, () => ({
                ...this.props,
                onSubmit: (e: Event) => this.onSubmit(e)
            }))
        }
    }

    onSubmit(e: Event) {
        e.preventDefault();
        const form: any = e.target;
        const formValues = this.getFormValues(form.elements);

        this.logFormValues(formValues);
        const formIsValid = this.validate(form);

        if (formIsValid && this.props.onSubmit) {
            this.props.onSubmit(formValues, form);
        }
    }

    validate(form: any):boolean {
        const formErrors = (this.props.fields || []).reduce((errorObj: any, field: any) => {
            const formElement = form.querySelector(`[name=${field.attribute}]`);
            const errorList = validate(field.validationParams, field.attribute, formElement.value);
            if (errorList.length) {
                errorObj[field.attribute] = errorList;
            }

            return errorObj;
        }, {});

        this.setProps({formErrors});
        return !Object.keys(formErrors).length;
    }

    logFormValues(formValues: Record<string, any>) {
        console.log(formValues);
    }

    getFormValues(formElements: HTMLFormElement[]):Record<string, any> {
       return Array.from(formElements).reduce((obj: any, element: HTMLFormElement) => {
            if (element.name) {
                obj[element.name] = element.value;
            }

            return obj;
        }, {});
    }

    render() {
        const source:string = `<span class='component' id='formView'></span>`;

        return createRenderContent(source, this.props);
    }
}