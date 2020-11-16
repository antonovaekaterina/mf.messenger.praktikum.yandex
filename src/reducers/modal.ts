import {TYPE_CLOSE_MODAL, TYPE_OPEN_MODAL} from "../actions/modal.js";
import {IAction} from '../components/Store/types.js';
import {ComponentType} from "../components/Block/types.js";

export interface IModal {
    id: string | number,
    props: Record<string, any> | null,
    component: ComponentType<any>
}

export default (state: IModal[] = [], action?: IAction):IModal[] => {
    if (!action) {
        return state;
    }

    switch (action.type) {
        case TYPE_CLOSE_MODAL:
            return state.filter((modal: any) => modal.id !== action.id)
        case TYPE_OPEN_MODAL:
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