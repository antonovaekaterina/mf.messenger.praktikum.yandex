import Block from "../../components/Block/Block.js";
import InputFieldView from "./InputFieldView.js";
import {IInputField} from "./type.js";
import {createNestedComponent, createRenderContent} from "../../utils/render.js";
import {validate} from "../../utils/validate.js";

export default class InputField extends Block<IInputField> {
    constructor(props: IInputField) {
        super(props);
    }

    createNestedComponents() {
        this.nestedComponents = {
            inputFieldView: createNestedComponent(InputFieldView, () => ({
                ...this.props,
                onBlur: (input: HTMLInputElement) => this.onBlur(input)
            }), 'LoginPage__wrap')
        }
    }

    onBlur(input: HTMLInputElement) {
        if (this.props.onBlur) {
            this.props.onBlur(input);
        }
        const errors:string[] = validate(this.props.validationParams, this.props.attribute, input.value);
        this.setProps({errors});
    }

    render() {
        const source:string = '<span class="component" id="inputFieldView"></span>';

        return createRenderContent(source, this.props);
    }
}