import Block from "../../../components/Block/Block.js";
import {createNestedComponent, createRenderContent, ICreateNestedComponent} from '../../../utils/render.js';
import {IRemoveUsersModal} from "../type.js";
import User from "../../../components/User/User.js";
import {store} from "../../../index.js";
import {chatServiceInstance} from "../../../services/chatService.js";

export default class RemoveUserModal extends Block<IRemoveUsersModal> {

    constructor(props: IRemoveUsersModal) {
        super(props);
    }

    createNestedComponents() {
        this.nestedComponents = {
            users: (this.props.activeChat?.users || []).map((_user, index: number) => createNestedComponent(User, () => {
                const user = this.props.activeChat?.users?.[index];

                return {
                    user: {...user}
                }
            })),
        }
    }

    componentDidMount() {
        store.subscribe(this, (state => ({
            activeChat: state.chat.activeChat
        })))

        const root = this.getFragment();
        const removingButtons = root.querySelectorAll('.RemoveUserModal__removing-btn');
        if (removingButtons) {
            Array.from(removingButtons).forEach(btn => btn.addEventListener('click', (e:Event) => this.handleRemoveBtnClick(e)))
        }
    }

    handleRemoveBtnClick(e: any) {
        const target = e.target;
        let userId = target.dataset.userId;
        if (userId) {
            userId = Number(userId);
            chatServiceInstance.deleteUsers({
                users: [userId],
                chatId: this.props.activeChat?.id
            }, userId === this.props.activeChat?.created_by)
        }
    }

    componentDidUpdate(oldProps: any, newProps: any): boolean {
        const shouldUpdate = super.componentDidUpdate(oldProps, newProps);

        if (shouldUpdate) {
            this.updateNestedComponents();
        }
        return shouldUpdate;
    }

    updateNestedComponents() {
        if (!this.props.activeChat?.users) return;

        const {users} = this.props.activeChat;

        if (users.length !== this.nestedComponents.users.length) {
            const propsChatsLength = users.length;
            const componentChatsLength = this.nestedComponents.users.length;

            if (propsChatsLength < componentChatsLength) {
                this.nestedComponents.users.splice(propsChatsLength);
                this.setPropsNestedComponents();
            } else {
                this.setPropsNestedComponents();

                let counter = componentChatsLength;
                while (counter < propsChatsLength) {
                    const index = counter;
                    this.nestedComponents.users.push(createNestedComponent(User, () => {
                        const user = this.props.activeChat?.users?.[index];

                        return {
                            user: {...user}
                        }
                    }));
                    ++counter;
                }
            }
        } else {
            this.setPropsNestedComponents();
        }
    }

    setPropsNestedComponents() {
        this.nestedComponents.users.forEach((nestedItem: ICreateNestedComponent) => nestedItem.component.setProps(nestedItem.getProps()));
    }

    render() {
        const source:string = (
            `<div class="RemoveUserModal">
                <h1>Удалить пользователей из чата</h1>
                    {{#if activeChat.users}}
                        {{#each activeChat.users}}
                            <div class="RemoveUserModal__user">
                                <span class="component" id="users" data-index="{{@index}}"></span>
                                <a class="RemoveUserModal__removing-btn" href="#" data-user-id="{{this.id}}">Удалить</a>
                            </div>
                        {{/each}}
                    {{/if}}
            </div>`
        );

        return createRenderContent(source, this.props)
    }
}
