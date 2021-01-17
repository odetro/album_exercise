export default function selectedPhotos(state = [], action) {
    switch (action.type) {
        case "ADD_PHOTOS":
            return action.value;
        default:
            return state
    }
};