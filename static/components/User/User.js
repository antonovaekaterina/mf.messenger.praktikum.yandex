import Block from "../../components/Block/Block.js";
import { createRenderContent } from "../../scripts/utils.js";
export default class User extends Block {
    constructor(props) {
        super(props);
    }
    render() {
        const source = (`<div class="User">
                <div class="User__img-wrap">
                    <div class="User__img"></div>
                    <div class="User__status {{status}}"></div>
                </div>
                <div class="User__info">
                    <div class="User__name">{{name}}</div>
                    {{#if message}}
                        <div class="User__message">{{message}}</div>
                    {{/if}}
                </div>
            </div>`);
        return createRenderContent(source, this.props);
    }
}
//# sourceMappingURL=User.js.map