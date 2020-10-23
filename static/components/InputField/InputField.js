import Block from "../../components/Block/Block.js";
import InputFieldView from "./InputFieldView.js";
import { createRenderContent } from "../../scripts/utils.js";
export default class InputField extends Block {
    constructor(props) {
        super(props);
    }
    render() {
        const source = '<span class="component" id="inputFieldView"></span>';
        const nestedComponents = {
            inputFieldView: new InputFieldView(this.props).getFragment()
        };
        return createRenderContent(source, this.props, nestedComponents);
    }
}
//# sourceMappingURL=InputField.js.map