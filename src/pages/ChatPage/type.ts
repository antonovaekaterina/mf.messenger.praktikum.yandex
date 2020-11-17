import {IUser} from '../../components/User/type.js';
import {IMessage} from '../../components/Message/type.js';
import {IActiveChatState} from '../../core/Store/reducers/chats.js';
import ChatType from '../../types/ChatType.js';
import {IModalProps} from '../../components/ModalPortal/types.js';
import UserType from '../../types/UserType';
import {IForm} from '../../components/Form/types';

export interface IChatItem {
    item: ChatType,
    isActive: boolean
}

export interface IChat {
    user: IUser,
    messages?: IMessage[]
}

export interface IMessengerInnerForm {

}

export interface SearchInnerForm {

}

export interface IChatList {
    chatList?: ChatType[],
    activeChat?: IActiveChatState
}

export interface IChatMain {
    activeChat?: IActiveChatState
}

export interface IRemoveUsersModal extends IModalProps {
    activeChat?: IActiveChatState
}

export interface IAddUsersModal extends IModalProps {
    foundUsers?: UserType[],
    activeChat?: IActiveChatState
}

export interface IAvatarInnerForm extends IForm {
    avatar?: string
}


