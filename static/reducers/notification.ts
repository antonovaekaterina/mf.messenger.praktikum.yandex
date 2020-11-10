import {TYPE_OPEN_NOTIFICATION, TYPE_CLOSE_NOTIFICATION} from "../actions/notification.js";
import {IAction} from '../components/Store/types.js';
import {ComponentType} from "../components/Block/types.js";

export interface INotification {
    id: string | number,
    props: Record<string, any> | null,
    component: ComponentType<any>
}

export default (state: INotification[] = [], action?: IAction):INotification[] => {
    if (!action) {
        return state;
    }

    switch (action.type) {
        case TYPE_CLOSE_NOTIFICATION:
            return state.filter((notification: any) => notification.id !== action.id)
        case TYPE_OPEN_NOTIFICATION:
            return [
                ...state,
                {
                    id: action.id,
                    props: action.props || null,
                    component: action.component
                }
            ]
        default:
            return state;
    }
}