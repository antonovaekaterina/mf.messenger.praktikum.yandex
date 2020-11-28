import Block from '../../components/Block/Block';
import {IMessage} from './type';
import {createRenderContent} from '../../utils/render';
import './Message.scss';

export default class Message extends Block<IMessage> {
    render() {
        const source:string = (
            '<div class=\'Message {{type}}\'>{{text}}</div>'
        );

        return createRenderContent(source, this.props);
    }
}
