import Block from '../../../components/Block/Block';
import {createRenderContent} from '../../../utils/render';
import {IMessengerInnerForm} from '../type';
import './MessengerInnerForm.scss';

export default class MessengerInnerForm extends Block<IMessengerInnerForm> {
    render() {
        const source = (
            `<div class="MessengerInnerForm">
                <textarea placeholder="Начните вводить сообщение..." name="message"></textarea>
                <button class="Icon MessengerInnerForm__messenger-attachment"></button>
                <input class="MessengerInnerForm__messenger-send-btn" type="submit" value="">
            </div>`
        );

        return createRenderContent(source, this.props);
    }
}

