import Block from '../../../components/Block/Block';
import {createNestedComponent, createRenderContent} from '../../../utils/render';
import {IModalProps} from '../../../components/ModalPortal/types';
import Form from '../../../components/Form/Form';
import CreateChatInnerForm from './CreateChatInnerForm';
import {chatServiceInstance} from '../../../services/chatService';
import {ICreateChatData} from '../../../api/chatAPI';
import './CreateChatModal.scss';

export default class CreateChatModal extends Block<IModalProps> {
    createNestedComponents() {
        this.nestedComponents = {
            createChatForm: createNestedComponent(Form, () => ({
                name: 'CreateChatForm',
                FormInner: CreateChatInnerForm,
                fields: [
                    {
                        attribute: 'title',
                        type: 'text',
                        label: 'Название чата',
                        validationParams: ['required']
                    }
                ],
                onSubmit: this.onSubmit.bind(this)
            }))
        };
    }

    onSubmit(formValues: ICreateChatData) {
        chatServiceInstance.createChat(formValues).then(() => {
            this.props.onClose();
        });
    }

    render() {
        const source:string = (
            `<div class='CreateChatModal'>
                <h1>Создать чат</h1>
                <span class='component' id='createChatForm'></span>
            </div>`
        );

        return createRenderContent(source, this.props);
    }
}
