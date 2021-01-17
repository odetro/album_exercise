export default function albumModalStatus(state = false, action) {
    switch (action.type) {
        case "CHANGE_MODAL_STATUS":
            return !state;
        default:
            return state;
    }
};