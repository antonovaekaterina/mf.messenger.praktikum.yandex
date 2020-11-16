import Block from "../../components/Block/Block.js";
import {IMessage} from './type.js'
import {createRenderContent} from "../../utils/render.js";

export default class Message extends Block<IMessage> {
    constructor(props: IMessage) {
        super(props);
    }

    render() {
        const source:string = (
            `<div class="Message {{type}}">{{text}}</div>`
        );

        return createRenderContent(source, this.props);
    }
}