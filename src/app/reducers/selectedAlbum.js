export default function selectedAlbum(state = 0, action) {
    switch (action.type) {
        case "CHANGE_ALBUM":
            return action.setNew;
        case "NO_ALBUM":
            return action.setNew;
        default:
            return state
    }
};