import Block from "../../components/Block/Block.js";
import renderDOM, { createRenderContent } from '../../scripts/utils.js';
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.js";
import Header from "../../components/Header/Header.js";
export default class ErrorPage extends Block {
    render() {
        const source = (`<span class="component" id="header"></span>
            <section class="ErrorPage">
                <div class="container-fluid">
                    <div class="ErrorPage__wrap">
                        <span class="component" id="errorMessage"></span>
                    </div>
                </div>
            </section>`);
        const nestedComponents = {
            header: new Header({ isProfilePage: false }).getFragment(),
            errorMessage: new ErrorMessage({
                errorType: 'server-error',
                imgText: 'Ошибка',
                title: 'Кажется, что-то пошло не так',
                subtitle: 'Мы уже работаем над этим'
            }).getFragment()
        };
        return createRenderContent(source, this.props, nestedComponents);
    }
}
const errorPage = new ErrorPage();
renderDOM('.root', errorPage.getFragment());
//# sourceMappingURL=ErrorPage.js.map