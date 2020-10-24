import Block from "../../components/Block/Block.js";
import renderDOM, {createRenderContent} from "../../scripts/utils.js";
import Header from "../../components/Header/Header.js";
import Form from "../../components/Form/Form.js";
import ProfileInnerForm from "./views/ProfileInnerForm.js";

export default class ProfilePage extends Block {
    render() {
        const source:string = (
            `<span class="component" id="header"></span>\`
            <span class="component" id="profileForm"></span>`
        );

        const commonFields = [
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
        ];

        const passwordFields = [
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
        ];


        const nestedComponents = {
            header: new Header({isProfilePage: true}).getFragment(),
            profileForm: new Form({
                name: 'ProfileForm',
                FormInner: ProfileInnerForm,
                commonFields,
                passwordFields
            }).getFragment()
        };

        return createRenderContent(source, this.props, nestedComponents);
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
