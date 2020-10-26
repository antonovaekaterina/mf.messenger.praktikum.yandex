import {IUser} from "../../components/User/type.js";
import {IMessage} from "../../components/Message/type.js";

export interface IContactBlock {
    id: number,
    name: string;
    status: 'online' | 'offline' | 'idle',
    thumbnailURL?: string,
    message?: string,
    newMessageCount: number,
    isActive?: boolean
}

export interface IChat {
    contacts: IContactBlock[],
    user: IUser,
    messages?: IMessage[]
}

export interface IMessengerInnerForm {

}

export interface SearchInnerForm {

}


