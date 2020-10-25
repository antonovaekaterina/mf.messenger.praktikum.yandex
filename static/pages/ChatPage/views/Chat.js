import Block from "../../../components/Block/Block.js";
import ContactBlock from "./ContactBlock.js";
import User from "../../../components/User/User.js";
import Message from "../../../components/Message/Message.js";
import { createNestedComponent, createRenderContent } from "../../../scripts/utils.js";
import Form from "../../../components/Form/Form.js";
import MessengerInnerForm from "./MessengerInnerForm.js";
import SearchInnerForm from "./SearchInnerForm.js";
export default class Chat extends Block {
    constructor(props) {
        super(props);
    }
    createNestedComponents() {
        this.nestedComponents = {
            messageList: this.props.messages.map((message) => createNestedComponent(Message, () => message)),
            user: createNestedComponent(User, () => (Object.assign({}, this.props.user))),
            contactList: this.props.contacts.map((contact) => createNestedComponent(ContactBlock, () => contact)),
            chatForm: createNestedComponent(Form, () => ({
                name: 'ChatForm',
                FormInner: MessengerInnerForm
            })),
            searchForm: createNestedComponent(Form, () => ({
                name: 'SearchForm',
                FormInner: SearchInnerForm
            })),
        };
    }
    componentDidUpdate(oldProps, newProps) {
        const result = super.componentDidUpdate(oldProps, newProps);
        if (result) {
            this.refreshNestedList(newProps.contacts, this.nestedComponents.contactList, ContactBlock);
            this.refreshNestedList(newProps.messages, this.nestedComponents.messageList, Message);
        }
        return result;
    }
    refreshNestedList(list, nestedComponentItems, constructor) {
        list.forEach((item, index) => {
            const nestedItem = nestedComponentItems[index];
            if (nestedItem) {
                nestedItem.setProps(item);
            }
            else {
                nestedComponentItems.push(createNestedComponent(constructor, () => item));
            }
        });
        nestedComponentItems.splice(list.length);
    }
    render() {
        const source = (`<div class="Chat">
                <div class="container-fluid">
                    <div class="Chat__grid">
                        <aside class="Chat__navigation">
                            <div class="Chat__search-dialogs">
                                <span class="component" id="searchForm"></span>
                            </div>
                            <div class="Chat__list">
                                {{#each contacts}}
                                    <span class="component" id="contactList" data-index="{{@index}}"></span>
                                {{/each}}
                            </div>
                            <button class="Chat__add-dialog-btn Icon" title="Добавить контакт"></button>
                        </aside>
                        <main class="Chat__main">
                            <div class="Chat__personal-info">
                                <span class="component" id="user"></span>
                                <button class="Icon" title="Настройки чата"></button>
                            </div>
                            <div class="Chat__messenger {{#if messages}}{{else}}Chat__messenger--empty{{/if}}">
                            {{#if messages.length}}
                                <div class="Chat__messenger-window">
                                    {{#each messages}}
                                        <span class="component" id="messageList" data-index="{{@index}}"></span>
                                    {{/each}}
                                </div>
                                <span class="component" id="chatForm"></span>
                             {{else}}
                                <p>Выберите чат, чтобы отправить сообщение</p>
                             {{/if}}
                            </div>
                        </main>
                    </div>
                </div>
            </div>`);
        return createRenderContent(source, this.props);
    }
}
//# sourceMappingURL=Chat.js.map