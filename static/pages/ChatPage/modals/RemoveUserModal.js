import Block from "../../../components/Block/Block.js";
import { createNestedComponent, createRenderContent } from '../../../utils/render.js';
import User from "../../../components/User/User.js";
import { store } from "../../../index.js";
import { chatServiceInstance } from "../../../services/chatService.js";
export default class RemoveUserModal extends Block {
    constructor(props) {
        super(props);
    }
    createNestedComponents() {
        var _a;
        this.nestedComponents = {
            users: (((_a = this.props.activeChat) === null || _a === void 0 ? void 0 : _a.users) || []).map((_user, index) => createNestedComponent(User, () => {
                var _a, _b;
                const user = (_b = (_a = this.props.activeChat) === null || _a === void 0 ? void 0 : _a.users) === null || _b === void 0 ? void 0 : _b[index];
                return {
                    user: Object.assign({}, user)
                };
            })),
        };
    }
    componentDidMount() {
        store.subscribe(this, (state => ({
            activeChat: state.chat.activeChat
        })));
        const root = this.getFragment();
        const removingButtons = root.querySelectorAll('.RemoveUserModal__removing-btn');
        if (removingButtons) {
            Array.from(removingButtons).forEach(btn => btn.addEventListener('click', (e) => this.handleRemoveBtnClick(e)));
        }
    }
    handleRemoveBtnClick(e) {
        var _a, _b;
        const target = e.target;
        let userId = target.dataset.userId;
        if (userId) {
            userId = Number(userId);
            chatServiceInstance.deleteUsers({
                users: [userId],
                chatId: (_a = this.props.activeChat) === null || _a === void 0 ? void 0 : _a.id
            }, userId === ((_b = this.props.activeChat) === null || _b === void 0 ? void 0 : _b.created_by));
        }
    }
    componentDidUpdate(oldProps, newProps) {
        const shouldUpdate = super.componentDidUpdate(oldProps, newProps);
        if (shouldUpdate) {
            this.updateNestedComponents();
        }
        return shouldUpdate;
    }
    updateNestedComponents() {
        var _a;
        if (!((_a = this.props.activeChat) === null || _a === void 0 ? void 0 : _a.users))
            return;
        const { users } = this.props.activeChat;
        if (users.length !== this.nestedComponents.users.length) {
            const propsChatsLength = users.length;
            const componentChatsLength = this.nestedComponents.users.length;
            if (propsChatsLength < componentChatsLength) {
                this.nestedComponents.users.splice(propsChatsLength);
                this.setPropsNestedComponents();
            }
            else {
                this.setPropsNestedComponents();
                let counter = componentChatsLength;
                while (counter < propsChatsLength) {
                    const index = counter;
                    this.nestedComponents.users.push(createNestedComponent(User, () => {
                        var _a, _b;
                        const user = (_b = (_a = this.props.activeChat) === null || _a === void 0 ? void 0 : _a.users) === null || _b === void 0 ? void 0 : _b[index];
                        return {
                            user: Object.assign({}, user)
                        };
                    }));
                    ++counter;
                }
            }
        }
        else {
            this.setPropsNestedComponents();
        }
    }
    setPropsNestedComponents() {
        this.nestedComponents.users.forEach((nestedItem) => nestedItem.component.setProps(nestedItem.getProps()));
    }
    render() {
        const source = (`<div class="RemoveUserModal">
                <h1>Удалить пользователей из чата</h1>
                    {{#if activeChat.users}}
                        {{#each activeChat.users}}
                            <div class="RemoveUserModal__user">
                                <span class="component" id="users" data-index="{{@index}}"></span>
                                <a class="RemoveUserModal__removing-btn" href="#" data-user-id="{{this.id}}">Удалить</a>
                            </div>
                        {{/each}}
                    {{/if}}
            </div>`);
        return createRenderContent(source, this.props);
    }
}
//# sourceMappingURL=RemoveUserModal.js.map