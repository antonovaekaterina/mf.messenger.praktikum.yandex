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

        const nestedComponents = {
            header: new Header({isProfilePage: true}).getFragment(),
            profileForm: new Form({
                name: 'ProfileForm',
                formInner: new ProfileInnerForm(this.props).getFragment()
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
