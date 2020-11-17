import Block from '../../../components/Block/Block.js';
import {IChat} from '../type.js';
import {createNestedComponent, createRenderContent} from '../../../utils/render.js';
import ChatsList from './ChatsList.js';
import ChatMain from './ChatMain.js';

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

