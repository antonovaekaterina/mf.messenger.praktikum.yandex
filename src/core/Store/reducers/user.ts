import {IAction} from '../types';
import {TYPE_SET_USER} from '../actions/auth';
import UserType from '../../../types/UserType';

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