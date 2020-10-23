import Block from "../../components/Block/Block.js";
import { createRenderContent } from "../../scripts/utils.js";
export default class InputFieldView extends Block {
    constructor(props) {
        super(props);
    }
    render() {
        const source = (`<div class="InputFieldView">
                <label for="{{attribute}}">{{label}}</label>
                <input type="{{type}}" id="{{attribute}}" name="{{attribute}}">
            </div>`);
        return createRenderContent(source, this.props);
    }
}
//# sourceMappingURL=InputFieldView.js.map