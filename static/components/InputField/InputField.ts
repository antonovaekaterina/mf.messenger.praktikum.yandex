import Block from "../../components/Block/Block.js";
import InputFieldView from "./InputFieldView.js";
import {IInputField} from "./type.js";
import {createRenderContent} from "../../scripts/utils.js";

export default class InputField extends Block {
    constructor(props: IInputField) {
        super(props);
    }

    render() {
        const source:string = '<span class="component" id="inputFieldView"></span>';

        const nestedComponents = {
            inputFieldView: new InputFieldView(this.props).getFragment()
        };

        return createRenderContent(source, this.props, nestedComponents);
    }
}