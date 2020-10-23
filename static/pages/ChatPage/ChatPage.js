import Block from "../../components/Block/Block.js";
import renderDOM, { createRenderContent } from '../../scripts/utils.js';
import Header from "../../components/Header/Header.js";
import Chat from "./views/Chat.js";
export default class ChatPage extends Block {
    constructor(props) {
        super(props);
    }
    render() {
        const source = (`<span class="component" id="header"></span>
            <span class="component" id="chat"></span>`);
        const nestedComponents = {
            header: new Header({ isProfilePage: false }).getFragment(),
            chat: new Chat(this.props).getFragment()
        };
        return createRenderContent(source, this.props, nestedComponents);
    }
}
const props = {
    contacts: [
        {
            name: 'Василий Панкратович',
            status: 'online',
            message: 'Привет! Как твое ничего?',
            newMessageCount: 1,
        },
        {
            name: 'Евгения Виссарионовна',
            status: 'online',
            message: 'Не поверишь, что я только что узнала!',
            newMessageCount: 2
        },
        {
            name: 'Лариса Павловна',
            status: 'online',
            message: 'Приглашаю тебя на юбилей!',
            newMessageCount: 0,
            isActive: true
        },
    ],
    user: {
        name: 'Прасковья Иосифовна',
        status: 'online',
    },
    messages: [
        {
            text: 'Входящее сообщение',
            type: 'incoming'
        },
        {
            text: 'Исходящее сообщение',
            type: 'outgoing'
        },
        {
            text: 'Еще одно исходящее сообщение',
            type: 'outgoing'
        },
    ]
};
const chatPage = new ChatPage(props);
renderDOM('.root', chatPage.getFragment());
//# sourceMappingURL=ChatPage.js.map