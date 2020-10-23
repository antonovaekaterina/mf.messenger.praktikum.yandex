import Block from "../../components/Block/Block.js";
import renderDOM, { createRenderContent } from '../../scripts/utils.js';
export default class IndexPage extends Block {
    render() {
        const source = (`<section class="IndexPage">
                <div class="container-fluid">
                    <nav>
                        <h1>Навигация по документу</h1>
                        <ul>
                            {{#each navItems}}
                                <li><a href="{{this.path}}">{{this.label}}</a></li>
                            {{/each}}
                        </ul>
                    </nav>
                </div>
            </section>`);
        return createRenderContent(source, this.props);
    }
}
const props = {
    navItems: [
        {
            label: 'Страница авторизации',
            path: './login.html'
        },
        {
            label: 'Страница регистрации',
            path: './registration.html'
        },
        {
            label: 'Страница чата',
            path: './active-chat.html'
        },
        {
            label: 'Страница с настройками профиля',
            path: './profile.html'
        },
        {
            label: 'Страница 404',
            path: './404.html'
        },
        {
            label: 'Страница 5**',
            path: './500.html'
        },
    ]
};
const indexPage = new IndexPage(props);
renderDOM('.root', indexPage.getFragment());
//# sourceMappingURL=IndexPage.js.map