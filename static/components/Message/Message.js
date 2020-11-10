import Block from "../../components/Block/Block.js";
import { createRenderContent } from "../../utils/render.js";
export default class Message extends Block {
    constructor(props) {
        super(props);
    }
    render() {
        const source = (`<div class="Message {{type}}">{{text}}</div>`);
        return createRenderContent(source, this.props);
    }
}
//# sourceMappingURL=Message.js.map