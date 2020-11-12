import Block from "../../../components/Block/Block.js";
import User from "../../../components/User/User.js";
import { createNestedComponent, createRenderContent } from "../../../utils/render.js";
import Form from "../../../components/Form/Form.js";
import MessengerInnerForm from "../forms/MessengerInnerForm.js";
import { store } from "../../../index.js";
export default class ChatMain extends Block {
    constructor(props) {
        super(props);
    }
    createNestedComponents() {
        this.nestedComponents = {
            activeChatInfo: createNestedComponent(User, () => {
                var _a, _b;
                return ({
                    user: {
                        display_name: (_a = this.props.activeChat) === null || _a === void 0 ? void 0 : _a.title,
                        avatar: (_b = this.props.activeChat) === null || _b === void 0 ? void 0 : _b.avatar
                    }
                });
            }),
            chatForm: createNestedComponent(Form, () => ({
                name: 'ChatForm',
                FormInner: MessengerInnerForm
            })),
        };
        console.log(this.nestedComponents);
    }
    componentDidMount() {
        store.subscribe(this, (state) => ({
            activeChat: state.chat.activeChat
        }));
    }
    componentDidUpdate(oldProps, newProps) {
        return super.componentDidUpdate(oldProps, newProps);
    }
    render() {
        const source = (`<main class="ChatMain">
                {{#if activeChat.id}}
                    <div class="ChatMain__personal-info">
                        <span class="component" id="activeChatInfo"></span>
                        <button class="Icon" title="Настройки чата"></button>
                    </div>
                {{/if}}
                <div class="ChatMain__messenger {{#if activeChat.id}}{{else}}ChatMain__messenger--empty{{/if}}">
                    {{#if activeChat.id}}
                        <div class="ChatMain__messenger-window"></div>
                        <span class="component" id="chatForm"></span>
                     {{else}}
                        <p>Выберите чат, чтобы отправить сообщение</p>
                     {{/if}}
                </div>
            </main>`);
        return createRenderContent(source, this.props);
    }
}
//# sourceMappingURL=ChatMain.js.map