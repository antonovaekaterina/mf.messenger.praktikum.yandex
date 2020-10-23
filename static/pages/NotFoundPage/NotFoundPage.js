import Block from "../../components/Block/Block.js";
import renderDOM, { createRenderContent } from '../../scripts/utils.js';
import Header from "../../components/Header/Header.js";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.js";
export default class NotFoundPage extends Block {
    render() {
        const source = (`<span class="component" id="header"></span>
            <section class="NotFoundPage">
                <div class="container-fluid">
                    <div class="NotFoundPage__wrap">
                        <span class="component" id="errorMessage"></span>
                    </div>
                </div>
            </section>`);
        const nestedComponents = {
            header: new Header({ isProfilePage: false }).getFragment(),
            errorMessage: new ErrorMessage({
                errorType: 'not-found',
                imgText: '404',
                title: 'Кажется, вы не туда попали',
                subtitle: 'Попробуйте начать сначала'
            }).getFragment()
        };
        return createRenderContent(source, this.props, nestedComponents);
    }
}
const notFoundPage = new NotFoundPage();
renderDOM('.root', notFoundPage.getFragment());
//# sourceMappingURL=NotFoundPage.js.map