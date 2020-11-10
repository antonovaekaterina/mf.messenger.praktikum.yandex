import Block from "../../../components/Block/Block.js";
import { createNestedComponent, createRenderContent } from '../../../utils/render.js';
import Form from "../../../components/Form/Form.js";
import CreateChatInnerForm from "./CreateChatInnerForm.js";
export default class CreateChatModal extends Block {
    constructor(props) {
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
            }))
        };
    }
    render() {
        const source = (`<div class="CreateChatModal">
                <h1>Создать чат</h1>
                <span class="component" id="createChatForm"></span>
            </div>`);
        return createRenderContent(source, this.props);
    }
}
//# sourceMappingURL=CreateChatModal.js.map