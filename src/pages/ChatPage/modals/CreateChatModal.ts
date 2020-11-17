import Block from '../../../components/Block/Block.js';
import {createNestedComponent, createRenderContent} from '../../../utils/render.js';
import {IModalProps} from '../../../components/ModalPortal/types.js';
import Form from '../../../components/Form/Form.js';
import CreateChatInnerForm from './CreateChatInnerForm.js';
import {chatServiceInstance} from '../../../services/chatService.js';
import {ICreateChatData} from '../../../api/chatAPI.js';

export default class CreateChatModal extends Block<IModalProps> {
    constructor(props: IModalProps) {
        super(props);
    }

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
                    },
                ],
                onSubmit: this.onSubmit.bind(this)
            }))
        }
    }

    onSubmit(formValues: ICreateChatData) {
        chatServiceInstance.createChat(formValues).then(() => {
            this.props.onClose()
        });
    }

    render() {
        const source:string = (
            `<div class='CreateChatModal'>
                <h1>Создать чат</h1>
                <span class='component' id='createChatForm'></span>
            </div>`
        );

        return createRenderContent(source, this.props)
    }
}
