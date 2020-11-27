import Block from '../../../components/Block/Block';
import {IChat} from '../type';
import {createNestedComponent, createRenderContent} from '../../../utils/render';
import ChatsList from './ChatsList';
import ChatMain from './ChatMain';
import './Chat.scss';

export default class Chat extends Block<IChat> {
    constructor(props: IChat) {
        super(props);
    }

    createNestedComponents() {
        this.nestedComponents = {
            chatsListAside: createNestedComponent(ChatsList, () => ({})),
            chatMain: createNestedComponent(ChatMain, () => ({})),
        }
    }

    render() {
        const source:string = (
            `<div class='Chat'>
                <div class='container-fluid'>
                    <div class='Chat__grid'>
                        <span class='component' id='chatsListAside'></span>
                        <span class='component' id='chatMain'></span>
                    </div>
                </div>
            </div>`
        );

        return createRenderContent(source, this.props)
    }
}

