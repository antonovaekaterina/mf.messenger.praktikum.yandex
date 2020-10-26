import Block from "../../components/Block/Block.js";
import InputFieldView from "./InputFieldView.js";
import { createNestedComponent, createRenderContent } from "../../scripts/utils.js";
import { validate } from "../../scripts/validate.js";
export default class InputField extends Block {
    constructor(props) {
        super(props);
    }
    createNestedComponents() {
        this.nestedComponents = {
            inputFieldView: createNestedComponent(InputFieldView, () => (Object.assign(Object.assign({}, this.props), { onBlur: (input) => this.onBlur(input) })), 'LoginPage__wrap')
        };
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
        return createRenderContent(source, this.props);
    }
}
//# sourceMappingURL=InputField.js.map