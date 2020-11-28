import Block from '../../../components/Block/Block';
import {createNestedComponent, createRenderContent} from '../../../utils/render';
import {IModalProps} from '../../../components/ModalPortal/types';
import Form from '../../../components/Form/Form';
import AvatarInnerForm from '../forms/AvatarInnerForm';
import {chatServiceInstance} from '../../../services/chatService';
import './ChangeAvatarModal.scss';

export default class ChangeAvatarModal extends Block<IModalProps> {
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
                    }
                ],
                onSubmit: this.onSubmit
            }))
        };
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

        return createRenderContent(source, this.props);
    }
}
