import Block from '../../../components/Block/Block';
import {IChatMain} from '../type';
import User from '../../../components/User/User';
import {createNestedComponent, createRenderContent} from '../../../utils/render';
import Form from '../../../components/Form/Form';
import MessengerInnerForm from '../forms/MessengerInnerForm';
import {store} from '../../../index';
import {openModal} from '../../../core/Store/actions/modal';
import SettingsModal from '../modals/SettingsModal';
import './ChatMain.scss';

export default class ChatMain extends Block<IChatMain> {
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
            }))
        };
    }

    componentDidMount() {
        store.subscribe(this, state => ({
            activeChat: state.chat.activeChat
        }));

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
        store.dispatch(openModal('SettingsModal', SettingsModal));
    }

    render() {
        const source:string = (
            `<main class='ChatMain'>
                {{#if activeChat.id}}
                    <div class='ChatMain__personal-info'>
                        <span class='component' id='activeChatInfo'></span>
                        <button class='Icon ChatMain__settings' title='Настройки чата'></button>
                    </div>
                {{/if}}
                <div class='ChatMain__messenger {{#if activeChat.id}}{{else}}ChatMain__messenger--empty{{/if}}'>
                    {{#if activeChat.id}}
                        <div class='ChatMain__messenger-window'></div>
                        <span class='component' id='chatForm'></span>
                     {{else}}
                        <p>Выберите чат, чтобы отправить сообщение</p>
                     {{/if}}
                </div>
            </main>`
        );

        return createRenderContent(source, this.props);
    }
}

