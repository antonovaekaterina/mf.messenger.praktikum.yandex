import Block from "../../../components/Block/Block.js";
import { createNestedComponent, createRenderContent } from '../../../utils/render.js';
import Form from "../../../components/Form/Form.js";
import AvatarInnerForm from "../forms/AvatarInnerForm.js";
import { chatServiceInstance } from "../../../services/chatService.js";
export default class ChangeAvatarModal extends Block {
    constructor(props) {
        super(props);
    }
    createNestedComponents() {
        this.nestedComponents = {
            form: createNestedComponent(Form, () => ({
                name: 'ChangeAvatarForm',
                FormInner: AvatarInnerForm,
                fields: [
                    {
                        attribute: 'avatar',
                        type: 'file',
                        label: '',
                        validationParams: ['required']
                    },
                ],
                onSubmit: this.onSubmit
            }))
        };
    }
    onSubmit(_formValues, form) {
        chatServiceInstance.refreshAvatar(form);
    }
    render() {
        const source = (`<div class="ChangeAvatarModal">
                <h1>Изменить аватар</h1>
                <span class="component" id="form"></span>
            </div>`);
        return createRenderContent(source, this.props);
    }
}
//# sourceMappingURL=ChangeAvatarModal.js.map