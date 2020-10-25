import Block from "../../components/Block/Block.js";
import renderDOM, { createNestedComponent, createRenderContent } from '../../scripts/utils.js';
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.js";
import Header from "../../components/Header/Header.js";
export default class ErrorPage extends Block {
    constructor(props) {
        super(props);
    }
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
        const source = (`<span class="component" id="header"></span>
            <section class="ErrorPage">
                <div class="container-fluid">
                    <div class="ErrorPage__wrap">
                        <span class="component" id="errorMessage"></span>
                    </div>
                </div>
            </section>`);
        return createRenderContent(source, this.props);
    }
}
const errorPage = new ErrorPage();
renderDOM('.root', errorPage.getFragment());
//# sourceMappingURL=ErrorPage.js.map