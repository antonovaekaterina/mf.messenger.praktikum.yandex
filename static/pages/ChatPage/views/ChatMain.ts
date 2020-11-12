import Block from "../../../components/Block/Block.js";
import {IChatMain} from '../type.js';
import User from "../../../components/User/User.js";
import {createNestedComponent, createRenderContent} from "../../../utils/render.js";
import Form from "../../../components/Form/Form.js";
import MessengerInnerForm from "../forms/MessengerInnerForm.js";
import {store} from "../../../index.js";
import {openModal} from "../../../actions/modal.js";
import SettingsModal from "../modals/SettingsModal.js";

export default class ChatMain extends Block<IChatMain> {

    constructor(props: IChatMain) {
        super(props);
    }

    createNestedComponents() {
        this.nestedComponents = {
            activeChatInfo: createNestedComponent(User, () => ({
                user: {
                    display_name: this.props.activeChat?.title,
                    avatar: this.props.activeChat?.avatar
                }
            })),
            chatForm: createNestedComponent(Form, () => ({
                name: 'ChatForm',
                FormInner: MessengerInnerForm
            })),
        }

        console.log(this.nestedComponents)
    }

    componentDidMount() {
        store.subscribe(this, (state) => ({
            activeChat: state.chat.activeChat
        }))

        this.addSettingsHandle();
    }

    componentDidUpdate(oldProps: IChatMain, newProps: IChatMain): boolean {
        this.addSettingsHandle();

        return super.componentDidUpdate(oldProps, newProps);
    }

    addSettingsHandle() {
        const root = this.getFragment();
        const settingsElem: HTMLElement | null = root.querySelector('.ChatMain__settings');
        if (settingsElem) {
            settingsElem.onclick = () => this.handleSettingsClick();
        }
    }

    handleSettingsClick() {
        store.dispatch(openModal('SettingsModal', SettingsModal))
    }
    
    render() {
        const source:string = (
            `<main class="ChatMain">
                {{#if activeChat.id}}
                    <div class="ChatMain__personal-info">
                        <span class="component" id="activeChatInfo"></span>
                        <button class="Icon ChatMain__settings" title="Настройки чата"></button>
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
            </main>`
        );

        return createRenderContent(source, this.props)
    }
}

