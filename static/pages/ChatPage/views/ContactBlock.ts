import Block from "../../../components/Block/Block.js";
import User from "../../../components/User/User.js";
import {IContactBlock} from "../type.js";
import {createNestedComponent, createRenderContent} from "../../../scripts/utils.js";

export default class ContactBlock extends Block {
    constructor(props: IContactBlock) {
        super(props);

    }

    createNestedComponents() {
        this.nestedComponents = {
            user: createNestedComponent(User, () => ({
                name: this.props.name,
                status: this.props.status,
                message: this.props.message
            }))
        }
    }

    render() {
        const source:string = (
            `<div class="ContactBlock {{#if isActive}}ContactBlock--active{{/if}}">
                <span class="component" id="user"></span>
                {{#if newMessageCount}}
                    <div class="ContactBlock__new-message-counter">{{newMessageCount}}</div>
                {{/if}}
            </div>
            `
        );

        return createRenderContent(source, this.props)
    }
}

