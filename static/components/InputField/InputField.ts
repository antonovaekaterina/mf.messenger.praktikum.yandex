import Block from "../../components/Block/Block.js";
import InputFieldView from "./InputFieldView.js";
import {IInputField} from "./type.js";
import {createRenderContent} from "../../scripts/utils.js";
import validate from "../../scripts/validate.js";

export default class InputField extends Block {
    constructor(props: IInputField) {
        super(props);
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

        const nestedComponents = {
            inputFieldView: new InputFieldView({
                ...this.props,
                onBlur: (input: HTMLInputElement) => this.onBlur(input)
            }).getFragment()
        };

        return createRenderContent(source, this.props, nestedComponents);
    }
}