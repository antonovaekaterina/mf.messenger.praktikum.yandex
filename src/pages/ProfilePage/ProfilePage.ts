import Block from '../../components/Block/Block';
import {createNestedComponent, createRenderContent} from '../../utils/render';
import Header from '../../components/Header/Header';
import Form from '../../components/Form/Form';
import ProfileInnerForm from './views/ProfileInnerForm';
import {IProfilePageProps} from './type';
import AvatarInnerForm from './views/AvatarInnerForm';
import PasswordInnerForm from './views/PasswordInnerForm';
import {IProfileData, IPasswordData} from '../../api/userAPI';
import {userServiceInstance} from '../../services/userService';
import './ProfilePage.scss';

export default class ProfilePage extends Block<IProfilePageProps> {
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
                    }
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
                    }
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
                    }
                ],
                onSubmit: this.onPasswordFormSubmit
            }))
        };
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

