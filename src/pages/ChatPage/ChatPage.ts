import Block from '../../components/Block/Block.js';
import {createNestedComponent, createRenderContent} from '../../utils/render.js';
import Header from '../../components/Header/Header.js';
import Chat from './views/Chat.js';
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
            `<span class='component' id='header'></span>
            <span class='component' id='chat'></span>`
        );

        return createRenderContent(source, this.props)
    }
}
