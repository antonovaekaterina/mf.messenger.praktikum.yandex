import Block from '../../../components/Block/Block';
import User from '../../../components/User/User';
import {IChatItem} from '../type';
import {createNestedComponent, createRenderContent} from '../../../utils/render';
import {chatServiceInstance} from '../../../services/chatService';
import {store} from '../../../index';
import {setActiveChat} from '../../../core/Store/actions/chat';
import './ChatItem.scss';

export default class ChatItem extends Block<IChatItem> {
    createNestedComponents() {
        this.nestedComponents = {
            user: createNestedComponent(User, () => ({
                user: {
                    display_name: this.props.item?.title,
                    avatar: this.props.item?.avatar
                }
            }))
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
        const source:string = (
            `<div class='ChatItem {{#if isActive}}ChatItem--active{{/if}}'>
                <span class='component' id='user'></span>
                {{#if newMessageCount}}
                    <div class='ChatItem__new-message-counter'>{{newMessageCount}}</div>
                {{/if}}
            </div>`
        );

        return createRenderContent(source, this.props);
    }
}

