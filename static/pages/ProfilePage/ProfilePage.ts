import Block from "../../components/Block/Block.js";
import renderDOM, {createNestedComponent, createRenderContent} from "../../scripts/utils.js";
import Header from "../../components/Header/Header.js";
import Form from "../../components/Form/Form.js";
import ProfileInnerForm from "./views/ProfileInnerForm.js";
import {IProfilePageProps} from './type.js';

export default class ProfilePage extends Block<IProfilePageProps> {
    constructor(props: IProfilePageProps) {
        super(props);
    }

    createNestedComponents() {
        this.nestedComponents = {
            header: createNestedComponent(Header, () => ({isProfilePage: true})),
            profileForm: createNestedComponent(Form, () => ({
                name: 'ProfileForm',
                FormInner: ProfileInnerForm,
                commonFields: [
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
                passwordFields: [
                    {
                        attribute: 'oldPassword',
                        type: 'password',
                        label: 'Старый пароль'
                    },
                    {
                        attribute: 'newPassword',
                        type: 'password',
                        label: 'Новый пароль'
                    },
                ],
                user: this.props.user
            }))
        }

    }

    render() {
        const source:string = (
            `<span class="component" id="header"></span>
            <span class="component" id="profileForm"></span>`
        );

        return createRenderContent(source, this.props);
    }
}

const props = {
    user: {
        firstName: 'Прасковья',
        lastName: 'Добролюбова',
        displayName: 'Прасковья Иосифовна'
    }
};

const profilePage = new ProfilePage(props);

renderDOM('.root', profilePage.getFragment());
