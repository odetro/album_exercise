import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { modalStatus, addPhotos } from "../../../app/actions";
import Modal from 'react-modal';
import axios from 'axios';
import { trackPromise } from 'react-promise-tracker';
import { useDropzone } from 'react-dropzone';
import './newAlbum.scss';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';

async function uploadAlbum(newAlbum) {
    try {
        const response = await axios.post(`/albums/`, newAlbum);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

async function uploadPhotos(newAlbumPhotos) {
    try {
        const response = await axios.post(`/photos/`, newAlbumPhotos);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export function NewAlbumModal(props) {
    const {setNewAlbum, newAlbum} = props;

    const isModalOpen = useSelector(state => state.albumModalStatus);
    const selectedUserID = useSelector(state => state.selectedUser);
    const dispatch = useDispatch();

    const [ photoFiles, setPhotoFiles ] = useState([]);
    const [ newAlbumTitle, setNewAlbumTitle ] = useState("");

    const handleChange = (e) => {        
        setNewAlbumTitle(e.target.value);
    };

    //DROPZONE-START
    const {getRootProps, getInputProps} = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            setPhotoFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });

    const thumbs = photoFiles.map(file => (
        <div className="thumb" key={file.name}>
          <div className="thumbInner">
            <img
                className="thumbImg"
                alt={file.name}
                src={file.preview}
            />
          </div>
        </div>
    ));
    //DROPZONE-END

    async function createAlbum () {
        if (newAlbumTitle.length === 0) {
            return alert("Enter Album Name");
        }
        if (photoFiles.length === 0) {
            return alert("No Photos Selected");
        }
        else {
            const id = new Date().getTime();
            setNewAlbum(
                {
                    "userId": selectedUserID,
                    "id": id,
                    "title": newAlbumTitle,
                }
            );
            const photos = [];
            photoFiles.map( photo => 
                    photos.push({
                        "albumId": id,
                        "id": photo.lastModified,
                        "title": photo.name,
                        "url": photo.preview,
                        "thumbnailUrl": photo.preview,
                    })
                );

            await trackPromise(uploadAlbum(newAlbum));
            await trackPromise(uploadPhotos(photos));

            dispatch(addPhotos(photos));
            dispatch(modalStatus());
            setPhotoFiles([]);
        }
    }

    return (
        <Modal className="new-album-modal" isOpen={isModalOpen} onRequestClose={() => dispatch(modalStatus())} contentLabel="newAlbumModal" ariaHideApp={false}>
            <div className="modal-container">
                <h3>ADD NEW ALBUM</h3>
                    <div className="modal-input-container">
                        <input className="album-input" placeholder="Album Name" onChange={handleChange} />
                    </div>
                    <div className="upload-container">
                        <div className="drag-drop">
                            <section className="container">
                                <div {...getRootProps({className: 'dropzone'})}>
                                  <input {...getInputProps()} />
                                  <p>Drag 'n' drop photos here, or click to select files</p>
                                </div>
                                <aside className="thumbsContainer">
                                  {thumbs}
                                </aside>
                            </section>
                        </div>
                    </div>
                <div className="modal-btn">
                    <button className="add-btn" onClick={() => createAlbum()}> ADD </button>
                    <button className="cancel-btn" onClick={() => {
                        setPhotoFiles([]);
                        dispatch(modalStatus());
                    }}>CANCEL</button>
                </div>
            </div>
        </Modal>
    )
}