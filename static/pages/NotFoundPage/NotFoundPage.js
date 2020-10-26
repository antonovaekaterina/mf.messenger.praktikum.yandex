import Block from "../../components/Block/Block.js";
import renderDOM, { createNestedComponent, createRenderContent } from '../../scripts/utils.js';
import Header from "../../components/Header/Header.js";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.js";
export default class NotFoundPage extends Block {
    constructor(props) {
        super(props);
    }
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
        const source = (`<span class="component" id="header"></span>
            <section class="NotFoundPage">
                <div class="container-fluid">
                    <div class="NotFoundPage__wrap">
                        <span class="component" id="errorMessage"></span>
                    </div>
                </div>
            </section>`);
        return createRenderContent(source, this.props);
    }
}
const notFoundPage = new NotFoundPage({});
renderDOM('.root', notFoundPage.getFragment());
//# sourceMappingURL=NotFoundPage.js.map