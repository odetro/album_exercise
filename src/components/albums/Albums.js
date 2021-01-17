import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './albums.scss';
import { useSelector, useDispatch } from 'react-redux';
import { changeAlbum, modalStatus, noAlbum } from '../../app/actions';
import { trackPromise } from 'react-promise-tracker';
import { NewAlbumModal } from './newAlbum/NewAlbumModal';
import { TiDelete } from "react-icons/ti";

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';

async function getAlbums(userID) {
    try {
        const response = await axios.get(`/users/${userID}/albums/`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
} 

async function deleteAlbum(albumID) {
    try {
        const response = await axios.delete(`albums/${albumID}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
} 

export function Albums() {

    const dispatch = useDispatch();
    const [albums, setAlbums ] = useState([]);
    const [ newAlbum, setNewAlbum ] = useState({});
    const selectedUserID = useSelector(state => state.selectedUser);
    const selectedAlbumID = useSelector(state => state.selectedAlbum);

    useEffect(() => {
        const get = async () => {
            const result = await trackPromise(getAlbums(selectedUserID));
            if (result) {
                setAlbums(result);
            }
        }
        get();
    },[selectedUserID]);

    useEffect(()=>{
        if (newAlbum.id) {
            let tempArr = albums;
            tempArr.push(newAlbum);
            setNewAlbum(tempArr);
            dispatch(changeAlbum(newAlbum.id));
        }
    },[newAlbum, albums, dispatch])

    async function removeAlbum(albumId) {
        if (albumId > -1) {
            await trackPromise(deleteAlbum(albumId));
            const albumIndex = albums.findIndex((album)=> album.id === albumId);
            let tempArr = albums;
            tempArr.splice(albumIndex,1);
            setAlbums([...tempArr]);
        }
        if (albumId === selectedAlbumID) {
            dispatch(noAlbum())
        }
    }

    function listAlbums(album) {
        return (
            <div className="album-detail" key={album.id}>
                <div className={album.id === selectedAlbumID ? "active-album-item" : "album-item"}>
                    <button className="album" onClick={()=>dispatch(changeAlbum(album.id))}>{album.title} </button>
                </div>
                <button className="delete-btn" onClick={()=>{removeAlbum(album.id)}}><TiDelete /></button>
            </div>
        )
    }
    
    return (
        <div>
            <h2 className="headline-album">ALBUMS LIST</h2>
            <div className="albums-container">
                <div className="albums-list">
                    {albums.map(album => listAlbums(album))}
                </div>
                <button className="add-new" onClick={() => dispatch(modalStatus())}>ADD NEW</button>
            </div>
            <NewAlbumModal newAlbum={newAlbum} setNewAlbum={setNewAlbum} />
        </div>
    )
}