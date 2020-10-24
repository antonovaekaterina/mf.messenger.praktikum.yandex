import Block from "../../../components/Block/Block.js";
import ContactBlock from "./ContactBlock.js";
import User from "../../../components/User/User.js";
import Message from "../../../components/Message/Message.js";
import { createRenderContent } from "../../../scripts/utils.js";
import Form from "../../../components/Form/Form.js";
import MessengerInnerForm from "./MessengerInnerForm.js";
import SearchInnerForm from "./SearchInnerForm.js";
export default class Chat extends Block {
    constructor(props) {
        super(props);
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
                                <span class="component" id="contactList"></span>
                            </div>
                            <button class="Chat__add-dialog-btn Icon" title="Добавить контакт"></button>
                        </aside>
                        <main class="Chat__main">
                            <div class="Chat__personal-info">
                                <span class="component" id="user"></span>
                                <button class="Icon" title="Настройки чата"></button>
                            </div>
                            <div class="Chat__messenger {{#if messages}}{{else}}Chat__messenger--empty{{/if}}">
                            {{#if messages}}
                                <div class="Chat__messenger-window">
                                    <span class="component" id="messageList"></span>
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
        const nestedComponents = {
            messageList: this.props.messages && this.props.messages.map((message) => new Message(message).getFragment()),
            user: new User(this.props.user).getFragment(),
            contactList: this.props.contacts.map((contact) => new ContactBlock(contact).getFragment()),
            chatForm: new Form({
                name: 'ChatForm',
                FormInner: MessengerInnerForm
            }).getFragment(),
            searchForm: new Form({
                name: 'SearchForm',
                FormInner: SearchInnerForm
            }).getFragment()
        };
        return createRenderContent(source, this.props, nestedComponents);
    }
}
//# sourceMappingURL=Chat.js.map