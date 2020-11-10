import Block from "../../../components/Block/Block.js";
import {createNestedComponent, createRenderContent} from '../../../utils/render.js';
import {IModalProps} from "../../../components/ModalPortal/types.js";
import Form from "../../../components/Form/Form.js";
import CreateChatInnerForm from "./CreateChatInnerForm.js";

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
                //onSubmit: this.onSubmit
            }))
        }
    }

    render() {
        const source:string = (
            `<div class="CreateChatModal">
                <h1>Создать чат</h1>
                <span class="component" id="createChatForm"></span>
            </div>`
        );

        return createRenderContent(source, this.props)
    }
}
