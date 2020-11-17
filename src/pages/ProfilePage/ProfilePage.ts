import Block from '../../components/Block/Block.js';
import {createNestedComponent, createRenderContent} from '../../utils/render.js';
import Header from '../../components/Header/Header.js';
import Form from '../../components/Form/Form.js';
import ProfileInnerForm from './views/ProfileInnerForm.js';
import {IProfilePageProps} from './type.js';
import AvatarInnerForm from './views/AvatarInnerForm.js';
import PasswordInnerForm from './views/PasswordInnerForm.js';
import {IProfileData, IPasswordData} from '../../api/userAPI.js';
import {userServiceInstance} from '../../services/userService.js';

export default class ProfilePage extends Block<IProfilePageProps> {
    constructor(props: IProfilePageProps) {
        super(props);
    }

    createNestedComponents() {
        this.nestedComponents = {
            header: createNestedComponent(Header, () => ({isProfilePage: true})),
            avatarForm: createNestedComponent(Form, () => ({
                name: 'AvatarForm',
                FormInner: AvatarInnerForm,
                fields: [
                    {
                        attribute: 'avatar',
                        type: 'file',
                        label: '',
                        validationParams: ['required']
                    },
                ],
                onSubmit: this.onAvatarFormFormSubmit
            })),
            profileForm: createNestedComponent(Form, () => ({
                name: 'ProfileForm',
                FormInner: ProfileInnerForm,
                fields: [
                    {
                        attribute: 'first_name',
                        type: 'text',
                        label: 'Имя',
                        validationParams: ['required']
                    },
                    {
                        attribute: 'second_name',
                        type: 'text',
                        label: 'Фамилия',
                        validationParams: ['required']
                    },
                    {
                        attribute: 'display_name',
                        type: 'text',
                        label: 'Никнейм',
                        validationParams: ['required']
                    },
                    {
                        attribute: 'email',
                        type: 'email',
                        label: 'Email',
                        validationParams: ['required', 'email']
                    },
                    {
                        attribute: 'phone',
                        type: 'text',
                        label: 'Номер телефона',
                        validationParams: ['required', 'phoneNumber']
                    },
                    {
                        attribute: 'login',
                        type: 'text',
                        label: 'Логин',
                        validationParams: ['required']
                    },
                ],
                onSubmit: this.onProfileFormSubmit
            })),
            passwordForm: createNestedComponent(Form, () => ({
                name: 'PasswordForm',
                FormInner: PasswordInnerForm,
                fields: [
                    {
                        attribute: 'oldPassword',
                        type: 'password',
                        label: 'Старый пароль',
                        validationParams: ['required']
                    },
                    {
                        attribute: 'newPassword',
                        type: 'password',
                        label: 'Новый пароль',
                        validationParams: ['required']
                    },
                ],
                onSubmit: this.onPasswordFormSubmit
            }))
        }
    }

    onProfileFormSubmit(formValues: IProfileData) {
        userServiceInstance.refreshProfile(formValues);
    }

    onPasswordFormSubmit(formValues: IPasswordData) {
        userServiceInstance.refreshPassword(formValues);
    }

    onAvatarFormFormSubmit(_formValues: any, form: any) {
        userServiceInstance.refreshAvatar(form);
    }

    render() {
        const source:string = (
            `<span class='component' id='header'></span>
            <span class='component' id='avatarForm'></span>
            <span class='component' id='profileForm'></span>
            <span class='component' id='passwordForm'></span>`
        );

        return createRenderContent(source, this.props);
    }
}

