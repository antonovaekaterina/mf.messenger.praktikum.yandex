import Block from "../../components/Block/Block.js";
import { createNestedComponent, createRenderContent } from '../../utils/render.js';
import Header from "../../components/Header/Header.js";
import Chat from "./views/Chat.js";
export default class ChatPage extends Block {
    constructor(props) {
        super(props);
    }
    createNestedComponents() {
        this.nestedComponents = {
            header: createNestedComponent(Header, () => ({
                isProfilePage: false
            })),
            chat: createNestedComponent(Chat, () => (Object.assign({}, this.props)))
        };
    }
    render() {
        const source = (`<span class="component" id="header"></span>
            <span class="component" id="chat"></span>`);
        return createRenderContent(source, this.props);
    }
}
//# sourceMappingURL=ChatPage.js.map