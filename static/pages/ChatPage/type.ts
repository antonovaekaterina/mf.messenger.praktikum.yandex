import {IUser} from "../../components/User/type.js";
import {IMessage} from "../../components/Message/type.js";
import {IActiveChatState} from "../../reducers/chats.js";
import ChatType from "../../types/ChatType.js";

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