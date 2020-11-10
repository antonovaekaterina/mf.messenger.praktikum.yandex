import { TYPE_CLOSE_MODAL, TYPE_OPEN_MODAL } from "../actions/modal.js";
export default (state = [], action) => {
    if (!action) {
        return state;
    }
    switch (action.type) {
        case TYPE_CLOSE_MODAL:
            return state.filter((modal) => modal.id !== action.id);
        case TYPE_OPEN_MODAL:
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
//# sourceMappingURL=modal.js.map