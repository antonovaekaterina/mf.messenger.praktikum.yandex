import { TYPE_SET_USER } from "../actions/auth.js";
export default (state = null, action) => {
    if (!action) {
        return state;
    }
    switch (action.type) {
        case TYPE_SET_USER:
            return action.value;
        default:
            return state;
    }
};
//# sourceMappingURL=user.js.map