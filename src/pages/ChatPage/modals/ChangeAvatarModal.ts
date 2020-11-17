import Block from '../../../components/Block/Block.js';
import {createNestedComponent, createRenderContent} from '../../../utils/render.js';
import {IModalProps} from '../../../components/ModalPortal/types.js';
import Form from '../../../components/Form/Form.js';
import AvatarInnerForm from '../forms/AvatarInnerForm.js';
import {chatServiceInstance} from '../../../services/chatService.js';

export default class ChangeAvatarModal extends Block<IModalProps> {

    constructor(props: IModalProps) {
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
        }
    }

    onSubmit(_formValues: any, form: any) {
        chatServiceInstance.refreshAvatar(form);
    }

    render() {
        const source: string = (
            `<div class="ChangeAvatarModal">
                <h1>Изменить аватар</h1>
                <span class="component" id="form"></span>
            </div>`
        );

        return createRenderContent(source, this.props)
    }
}
