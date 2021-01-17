export default function userDropMenuStatus(state = false, action) {
    switch (action.type) {
        case "CHANGE_DROPDOWN_STATUS":
            return !state;
        default:
            return state;
    }
};