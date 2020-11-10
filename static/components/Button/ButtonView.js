import Block from "../../components/Block/Block.js";
import { createRenderContent } from "../../utils/render.js";
export default class ButtonView extends Block {
    constructor(props) {
        super(props);
    }
    render() {
        const source = (`<input class="ButtonView" type="submit" value="{{label}}">`);
        return createRenderContent(source, this.props);
    }
}
//# sourceMappingURL=ButtonView.js.map