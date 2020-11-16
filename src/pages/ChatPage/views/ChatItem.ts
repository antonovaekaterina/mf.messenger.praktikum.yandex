import Block from "../../../components/Block/Block.js";
import User from "../../../components/User/User.js";
import {IChatItem} from "../type.js";
import {createNestedComponent, createRenderContent} from "../../../utils/render.js";
import {chatServiceInstance} from "../../../services/chatService.js";
import {store} from "../../../index.js";
import {setActiveChat} from "../../../core/Store/actions/chat.js";

export default class ChatItem extends Block<IChatItem> {
    constructor(props: IChatItem) {
        super(props);
    }

    createNestedComponents() {
        this.nestedComponents = {
            user: createNestedComponent(User, () => ({
                user: {
                    display_name: this.props.item?.title,
                    avatar: this.props.item?.avatar
                }
            }))
        }
    }

    componentDidMount() {
        const root = this.getFragment();
        const chatItemElem = root.querySelector('.ChatItem');
        if (chatItemElem) {
            chatItemElem.addEventListener('click', () => this.handleChatItemClick())
        }
    }

    handleChatItemClick() {
        store.dispatch(setActiveChat(this.props.item));
        chatServiceInstance.getUsers(this.props.item.id);
    }

    render() {
        const source:string = (
            `<div class="ChatItem {{#if isActive}}ChatItem--active{{/if}}">
                <span class="component" id="user"></span>
                {{#if newMessageCount}}
                    <div class="ChatItem__new-message-counter">{{newMessageCount}}</div>
                {{/if}}
            </div>`
        );

        return createRenderContent(source, this.props)
    }
}

