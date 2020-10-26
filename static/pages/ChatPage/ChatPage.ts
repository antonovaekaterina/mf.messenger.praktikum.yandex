import Block from "../../components/Block/Block.js";
import renderDOM, {createNestedComponent, createRenderContent} from '../../scripts/utils.js';
import Header from "../../components/Header/Header.js";
import Chat from "./views/Chat.js";
import {IChat} from './type.js';

export default class ChatPage extends Block<IChat> {
    constructor(props: IChat) {
        super(props);
    }

    createNestedComponents() {
        this.nestedComponents = {
            header: createNestedComponent(Header, () => ({
                isProfilePage: false
            })),
            chat: createNestedComponent(Chat, () => ({...this.props}))
        }
    }

    render() {
        const source:string = (
            `<span class="component" id="header"></span>
            <span class="component" id="chat"></span>`
        );

        return createRenderContent(source, this.props)
    }
}

const props:IChat = {
    contacts: [
        {
            id: 1,
            name: 'Василий Панкратович',
            status: 'online',
            message: 'Привет! Как твое ничего?',
            newMessageCount: 1,
        },
        {
            id: 2,
            name: 'Евгения Виссарионовна',
            status: 'online',
            message: 'Не поверишь, что я только что узнала!',
            newMessageCount: 2
        },
        {
            id: 3,
            name: 'Лариса Павловна',
            status: 'online',
            message: 'Приглашаю тебя на юбилей!',
            newMessageCount: 0,
            isActive: true
        },
    ],
    user: {
        id: 1,
        name: 'Прасковья Иосифовна',
        status: 'online',
    },
    messages: [
        {
            id: 1,
            text: 'Входящее сообщение',
            type: 'incoming'
        },
        {
            id: 2,
            text: 'Исходящее сообщение',
            type: 'outgoing'
        },
        {
            id: 3,
            text: 'Еще одно исходящее сообщение',
            type: 'outgoing'
        },
    ]
};

const chatPage = new ChatPage(props);

renderDOM('.root', chatPage.getFragment());
