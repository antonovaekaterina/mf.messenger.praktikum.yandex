import Block from '../../components/Block/Block.js';
import RegistrationForm from './views/RegistrationForm.js';
import {createNestedComponent, createRenderContent} from '../../utils/render.js';
import {IRegistrationPage} from './type.js';

export default class RegistrationPage extends Block<IRegistrationPage> {
    constructor(props?: any) {
        super(props);
    }

    createNestedComponents() {
        this.nestedComponents = {
            registrationForm: createNestedComponent(RegistrationForm, () => ({}), 'RegistrationPage__wrap')
        }
    }

    render() {
        const source:string = (
            `<section class='RegistrationPage'>
                <div class='container-fluid'>
                    <span class='component' id='registrationForm'></span>
                </div>
            </section>`
        );

        return createRenderContent(source, this.props)
    }
}
