import Block from "../../../components/Block/Block.js";
import User from "../../../components/User/User.js";
import { createNestedComponent, createRenderContent } from "../../../utils/render.js";
import { chatServiceInstance } from "../../../services/chatService.js";
import { store } from "../../../index.js";
import { setActiveChat } from "../../../actions/chat.js";
export default class ChatItem extends Block {
    constructor(props) {
        super(props);
    }
    createNestedComponents() {
        this.nestedComponents = {
            user: createNestedComponent(User, () => {
                var _a, _b;
                return ({
                    user: {
                        display_name: (_a = this.props.item) === null || _a === void 0 ? void 0 : _a.title,
                        avatar: (_b = this.props.item) === null || _b === void 0 ? void 0 : _b.avatar
                    }
                });
            })
        };
    }
    componentDidMount() {
        const root = this.getFragment();
        const chatItemElem = root.querySelector('.ChatItem');
        if (chatItemElem) {
            chatItemElem.addEventListener('click', () => this.handleChatItemClick());
        }
    }
    handleChatItemClick() {
        store.dispatch(setActiveChat(this.props.item));
        chatServiceInstance.getUsers(this.props.item.id);
    }
    render() {
        const source = (`<div class="ChatItem {{#if isActive}}ChatItem--active{{/if}}">
                <span class="component" id="user"></span>
                {{#if newMessageCount}}
                    <div class="ChatItem__new-message-counter">{{newMessageCount}}</div>
                {{/if}}
            </div>`);
        return createRenderContent(source, this.props);
    }
}
//# sourceMappingURL=ChatItem.js.map