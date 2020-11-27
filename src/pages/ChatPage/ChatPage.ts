import Block from '../../components/Block/Block';
import {createNestedComponent, createRenderContent} from '../../utils/render';
import Header from '../../components/Header/Header';
import Chat from './views/Chat';
import {IChat} from './type';
import './ChatPage.scss';

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
