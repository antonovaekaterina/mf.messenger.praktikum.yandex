import Block from '../../components/Block/Block';
import {createNestedComponent, createRenderContent} from '../../utils/render';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Header from '../../components/Header/Header';
import {IErrorPage} from './type';
import './ErrorPage.scss';

export default class ErrorPage extends Block<IErrorPage> {
    createNestedComponents() {
        this.nestedComponents = {
            header: createNestedComponent(Header, () => ({
                isProfilePage: false
            })),
            errorMessage: createNestedComponent(ErrorMessage, () => ({
                errorType: 'server-error',
                imgText: 'Ошибка',
                title: 'Кажется, что-то пошло не так',
                subtitle: 'Мы уже работаем над этим'
            }))
        };
    }

    render() {
        const source:string = (
            `<span class='component' id='header'></span>
            <section class='ErrorPage'>
                <div class='container-fluid'>
                    <div class='ErrorPage__wrap'>
                        <span class='component' id='errorMessage'></span>
                    </div>
                </div>
            </section>`
        );

        return createRenderContent(source, this.props);
    }
}
