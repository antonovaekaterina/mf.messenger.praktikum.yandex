import Block from "../../../components/Block/Block.js";
import { createNestedComponent, createRenderContent } from '../../../utils/render.js';
import Form from "../../../components/Form/Form.js";
import { userServiceInstance } from "../../../services/userService.js";
import AddUserInnerForm from "../forms/AddUserInnerForm.js";
import User from "../../../components/User/User.js";
import { store } from "../../../index.js";
import { chatServiceInstance } from "../../../services/chatService.js";
export default class AddUserModal extends Block {
    constructor(props) {
        super(props);
    }
    createNestedComponents() {
        this.nestedComponents = {
            form: createNestedComponent(Form, () => ({
                name: 'AddUserForm',
                FormInner: AddUserInnerForm,
                fields: [
                    {
                        attribute: 'login',
                        type: 'text',
                        label: 'Логин',
                        validationParams: ['required']
                    },
                ],
                onSubmit: this.onSubmit.bind(this)
            })),
            users: (this.props.foundUsers || []).map((_user, index) => createNestedComponent(User, () => {
                var _a;
                const user = (_a = this.props.foundUsers) === null || _a === void 0 ? void 0 : _a[index];
                return {
                    user: Object.assign({}, user)
                };
            })),
        };
    }
    onSubmit(formValues) {
        userServiceInstance.searchUser(formValues).then(foundUsers => this.setProps({ foundUsers }));
    }
    componentDidMount() {
        store.subscribe(this, (state => ({
            activeChat: state.chat.activeChat
        })));
        const root = this.getFragment();
        const usersWrap = root.querySelector('.AddUserModal__users-wrap');
        if (usersWrap) {
            usersWrap.onclick = (e) => this.handleAddBtnClick(e);
        }
    }
    componentDidUpdate(oldProps, newProps) {
        const shouldUpdate = super.componentDidUpdate(oldProps, newProps);
        if (shouldUpdate) {
            this.updateNestedComponents();
        }
        return shouldUpdate;
    }
    handleAddBtnClick(e) {
        var _a;
        const target = e.target;
        if (target.classList.contains('AddUserModal__add-btn')) {
            let userId = target.dataset.userId;
            if (userId) {
                userId = Number(userId);
                chatServiceInstance.addUsers({
                    users: [userId],
                    chatId: (_a = this.props.activeChat) === null || _a === void 0 ? void 0 : _a.id
                });
            }
        }
    }
    updateNestedComponents() {
        if (!this.props.foundUsers)
            return;
        const { foundUsers } = this.props;
        if (foundUsers.length !== this.nestedComponents.users.length) {
            const propsChatsLength = foundUsers.length;
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
                        var _a;
                        const user = (_a = this.props.foundUsers) === null || _a === void 0 ? void 0 : _a[index];
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
        const source = (`<div class="AddUserModal">
                <h1>Добавить пользователей в чат</h1>
                <span class="component" id="form"></span>
                    <div class="AddUserModal__users-wrap">
                        {{#if foundUsers}}
                           {{#each foundUsers}}
                             <div class="AddUserModal__user">
                                <span class="component" id="users" data-index="{{@index}}"></span>
                                <a class="AddUserModal__add-btn" href="#" data-user-id="{{this.id}}">Добавить</a>
                            </div>
                           {{/each}}
                       {{/if}}
                   </div>
                
            </div>`);
        return createRenderContent(source, this.props);
    }
}
//# sourceMappingURL=AddUserModal.js.map