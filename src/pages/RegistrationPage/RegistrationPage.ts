import Block from '../../components/Block/Block';
import RegistrationForm from './views/RegistrationForm';
import {createNestedComponent, createRenderContent} from '../../utils/render';
import {IRegistrationPage} from './type';
import './RegistrationPage.scss';

export default class RegistrationPage extends Block<IRegistrationPage> {
    createNestedComponents() {
        this.nestedComponents = {
            registrationForm: createNestedComponent(RegistrationForm, () => ({}), 'RegistrationPage__wrap')
        };
    }

    render() {
        const source:string = (
            `<section class='RegistrationPage'>
                <div class='container-fluid'>
                    <span class='component' id='registrationForm'></span>
                </div>
            </section>`
        );

        return createRenderContent(source, this.props);
    }
}
