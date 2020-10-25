import Block from "../../components/Block/Block.js";
import User from "../User/User.js";
import { createNestedComponent, createRenderContent } from "../../scripts/utils.js";
export default class Header extends Block {
    constructor(props) {
        super(props);
    }
    createNestedComponents() {
        this.nestedComponents = {
            user: createNestedComponent(User, () => ({
                name: 'Праскофья Иосифовна', status: 'online'
            }))
        };
    }
    render() {
        const source = (`<header class="Header">
                <div class="container-fluid">
                    <nav>
                        {{#if isProfilePage}}
                            <a class="Header__back-btn Header__link" href="./active-chat.html">
                            <div class="Icon"></div><span class="Header__settings-label">Вернуться к чатам</span></a>
                        {{else}}
                            <span class="component" id="user"></span>
                            <a class="Header__settings Header__link" href="./profile.html">
                                <div class="Icon"></div>
                                <span class="Header__settings-label">Профиль</span>
                            </a>
                        {{/if}}
                    </nav>
                </div>
            </header>`);
        return createRenderContent(source, this.props);
    }
}
//# sourceMappingURL=Header.js.map