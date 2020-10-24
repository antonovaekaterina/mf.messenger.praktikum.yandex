import Block from "../../components/Block/Block.js";
import InputFieldView from "./InputFieldView.js";
import { createRenderContent } from "../../scripts/utils.js";
import validate from "../../scripts/validate.js";
export default class InputField extends Block {
    constructor(props) {
        super(props);
    }
    onBlur(input) {
        if (this.props.onBlur) {
            this.props.onBlur(input);
        }
        const errors = validate(this.props.validationParams, this.props.attribute, input.value);
        this.setProps({ errors });
    }
    render() {
        const source = '<span class="component" id="inputFieldView"></span>';
        const nestedComponents = {
            inputFieldView: new InputFieldView(Object.assign(Object.assign({}, this.props), { onBlur: (input) => this.onBlur(input) })).getFragment()
        };
        return createRenderContent(source, this.props, nestedComponents);
    }
}
//# sourceMappingURL=InputField.js.map