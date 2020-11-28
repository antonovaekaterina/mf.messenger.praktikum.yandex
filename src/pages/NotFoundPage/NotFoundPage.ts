import Block from '../../components/Block/Block';
import {createNestedComponent, createRenderContent} from '../../utils/render';
import Header from '../../components/Header/Header';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import {INotFoundPage} from './type';
import './NotFoundPage.scss';

export default class NotFoundPage extends Block<INotFoundPage> {
    createNestedComponents() {
        this.nestedComponents = {
            header: createNestedComponent(Header, () => ({
                isProfilePage: false
            })),
            errorMessage: createNestedComponent(ErrorMessage, () => ({
                errorType: 'not-found',
                imgText: '404',
                title: 'Кажется, вы не туда попали',
                subtitle: 'Попробуйте начать сначала'
            }))
        };
    }

    render() {
        const source:string = (
            `<span class='component' id='header'></span>
            <section class='NotFoundPage'>
                <div class='container-fluid'>
                    <div class='NotFoundPage__wrap'>
                        <span class='component' id='errorMessage'></span>
                    </div>
                </div>
            </section>`
        );

        return createRenderContent(source, this.props);
    }
}
