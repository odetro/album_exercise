//SELECTED USER
export const changeUser = content => ({
    type: "CHANGE_USER",
    setNew: content,
});

//USERS MENU
export const dropdownStatus = () => ({
    type: "CHANGE_DROPDOWN_STATUS",
});

//SELECTED ALBUM
export const changeAlbum = content => ({
    type: "CHANGE_ALBUM",
    setNew: content,
});
export const noAlbum = () => ({
    type: "NO_ALBUM",
    setNew: 0,
});

//NEW ALBUM MODAL
export const modalStatus = () => ({
    type: "CHANGE_MODAL_STATUS",
});

//SELECTED PHOTOS
export const addPhotos = content => ({
    type: "ADD_PHOTOS",
    value: content
});

