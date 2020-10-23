import {IForm} from './types.js';
import Block from "../Block/Block.js";
import FormView from "./FormView.js";
import {createRenderContent} from "../../scripts/utils.js";

export default class Form extends Block {
    constructor(props: IForm) {
        super(props);
    }

    onSubmit(e: Event) {
        e.preventDefault();
        const form = e.target;
        if (this.props.onSubmit) {
            this.props.onSubmit(form);
        }

        this.logFormValues(form);
    }

    logFormValues(form: any) {
        const formElements:HTMLFormElement[] = Array.from(form.elements);
        const formValues: object = formElements.reduce((obj: any, element: HTMLFormElement) => {
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