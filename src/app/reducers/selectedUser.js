export default function selectedUser(state = 1, action) {
    switch (action.type) {
        case "CHANGE_USER":
            return action.setNew;
        default:
            return state
    }
};