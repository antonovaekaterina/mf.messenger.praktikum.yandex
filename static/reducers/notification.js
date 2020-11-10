import { TYPE_OPEN_NOTIFICATION, TYPE_CLOSE_NOTIFICATION } from "../actions/notification.js";
export default (state = [], action) => {
    if (!action) {
        return state;
    }
    switch (action.type) {
        case TYPE_CLOSE_NOTIFICATION:
            return state.filter((notification) => notification.id !== action.id);
        case TYPE_OPEN_NOTIFICATION:
            return [
                ...state,
                {
                    id: action.id,
                    props: action.props || null,
                    component: action.component
                }
            ];
        default:
            return state;
    }
};
//# sourceMappingURL=notification.js.map