import Block from "../../../components/Block/Block.js";
import { createRenderContent } from '../../../utils/render.js';
import { store } from "../../../index.js";
import { openModal } from "../../../actions/modal.js";
import RemoveUserModal from "./RemoveUserModal.js";
import AddUserModal from "./AddUserModal.js";
import ChangeAvatarModal from "./ChangeAvatarModal.js";
export default class SettingsModal extends Block {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const root = this.getFragment();
        this.addHandleClick(root, '.SettingsModal__add-users a', (e) => this.handleAddUserClick(e));
        this.addHandleClick(root, '.SettingsModal__remove-users a', (e) => this.handleRemoveUserClick(e));
        this.addHandleClick(root, '.SettingsModal__change-avatar a', (e) => this.handleChangeAvatarClick(e));
    }
    addHandleClick(root, selector, handle) {
        const node = root.querySelector(selector);
        if (node) {
            node.addEventListener('click', handle);
        }
    }
    handleAddUserClick(e) {
        e.preventDefault();
        this.props.onClose();
        store.dispatch(openModal('AddUserModal', AddUserModal));
    }
    handleRemoveUserClick(e) {
        e.preventDefault();
        this.props.onClose();
        store.dispatch(openModal('RemoveUserModal', RemoveUserModal));
    }
    handleChangeAvatarClick(e) {
        e.preventDefault();
        this.props.onClose();
        store.dispatch(openModal('AvatarModal', ChangeAvatarModal));
    }
    render() {
        const source = (`<div class="SettingsModal">
                <h1>Настройки чата</h1>
                <ul>
                    <li class="SettingsModal__add-users"><a href="#">Добавить пользователей в чат</a></li>
                    <li class="SettingsModal__remove-users"><a href="#">Удалить пользователей из чата</a></li>
                    <li class="SettingsModal__change-avatar"><a href="#">Изменить аватар беседы</a></li>
                </ul>
            </div>`);
        return createRenderContent(source, this.props);
    }
}
//# sourceMappingURL=SettingsModal.js.map