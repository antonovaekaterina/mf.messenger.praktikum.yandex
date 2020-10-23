import Block from "../../../components/Block/Block.js";
import User from "../../../components/User/User.js";
import { createRenderContent } from "../../../scripts/utils.js";
export default class ContactBlock extends Block {
    constructor(props) {
        super(props);
    }
    render() {
        const source = (`<div class="ContactBlock {{#if isActive}}ContactBlock--active{{/if}}">
                <span class="component" id="user"></span>
                {{#if newMessageCount}}
                    <div class="ContactBlock__new-message-counter">{{newMessageCount}}</div>
                {{/if}}
            </div>
            `);
        const nestedComponents = {
            user: new User({
                name: this.props.name,
                status: this.props.status,
                message: this.props.message
            }).getFragment(),
        };
        return createRenderContent(source, this.props, nestedComponents);
    }
}
//# sourceMappingURL=ContactBlock.js.map