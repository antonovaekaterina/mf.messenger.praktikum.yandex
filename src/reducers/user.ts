import {IAction} from '../components/Store/types.js';
import {TYPE_SET_USER} from "../actions/auth.js";
import UserType from "../types/UserType.js";

export default (state: UserType | null = null, action?: IAction):UserType | null => {
    if (!action) {
        return state;
    }

    switch (action.type) {
        case TYPE_SET_USER:
            return action.value
        default:
            return state;
    }
}