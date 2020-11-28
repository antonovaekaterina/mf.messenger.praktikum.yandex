import Block from '../../../components/Block/Block';
import {createRenderContent} from '../../../utils/render';
import {store} from '../../../index';
import {openModal} from '../../../core/Store/actions/modal';
import RemoveUserModal from './RemoveUserModal';
import AddUserModal from './AddUserModal';
import {IModalProps} from '../../../components/ModalPortal/types';
import ChangeAvatarModal from './ChangeAvatarModal';
import './SettingsModal.scss';

export default class SettingsModal extends Block<IModalProps> {
    componentDidMount() {
        const root = this.getFragment();
        this.addHandleClick(root, '.SettingsModal__add-users a', (e: Event) => this.handleAddUserClick(e));
        this.addHandleClick(root, '.SettingsModal__remove-users a', (e: Event) => this.handleRemoveUserClick(e));
        this.addHandleClick(root, '.SettingsModal__change-avatar a', (e: Event) => this.handleChangeAvatarClick(e));
    }

    addHandleClick(root: HTMLElement, selector: string, handle: (e: Event) => void) {
        const node = root.querySelector(selector);

        if (node) {
            node.addEventListener('click', handle);
        }
    }

    handleAddUserClick(e: Event) {
        e.preventDefault();
        this.props.onClose();
        store.dispatch(openModal('AddUserModal', AddUserModal));
    }

    handleRemoveUserClick(e: Event) {
        e.preventDefault();
        this.props.onClose();
        store.dispatch(openModal('RemoveUserModal', RemoveUserModal));
    }

    handleChangeAvatarClick(e: Event) {
        e.preventDefault();
        this.props.onClose();
        store.dispatch(openModal('AvatarModal', ChangeAvatarModal));
    }

    render() {
        const source:string = (
            `<div class='SettingsModal'>
                <h1>Настройки чата</h1>
                <ul>
                    <li class='SettingsModal__add-users'><a href='#'>Добавить пользователей в чат</a></li>
                    <li class='SettingsModal__remove-users'><a href='#'>Удалить пользователей из чата</a></li>
                    <li class='SettingsModal__change-avatar'><a href='#'>Изменить аватар беседы</a></li>
                </ul>
            </div>`
        );

        return createRenderContent(source, this.props);
    }
}
