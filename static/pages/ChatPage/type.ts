import {IUser} from "../../components/User/type.js";
import {IMessage} from "../../components/Message/type.js";

export interface IContactBlock {
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

