import Block from "../../components/Block/Block.js";
import ButtonView from "./ButtonView.js";
import { createNestedComponent, createRenderContent } from "../../scripts/utils.js";
export default class Button extends Block {
    constructor(props) {
        super(props);
    }
    createNestedComponents() {
        this.nestedComponents = {
            buttonView: createNestedComponent(ButtonView, () => (Object.assign({}, this.props)))
        };
    }
    render() {
        const source = '<span class="component" id="buttonView"></span>';
        return createRenderContent(source, this.props);
    }
}
//# sourceMappingURL=Button.js.map