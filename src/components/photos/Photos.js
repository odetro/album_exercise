import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import ImageGallery from 'react-image-gallery';
import { trackPromise } from 'react-promise-tracker';
import './photos.scss';
import emptyPhotos from '../../empty_photos.svg';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';

async function getPhotos(AlbumID) {
    try {
        const response = await axios.get(`/albums/${AlbumID}/photos`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
} 

export function Photos() {

    const selectedAlbumID = useSelector(state => state.selectedAlbum);

    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        const get = async () => {
            const result = await trackPromise(getPhotos(selectedAlbumID));
            if (result) {
                setPhotos(result);
            }
        }
        get();
    },[selectedAlbumID]);

    function prepareGallery() {
        if (photos && photos.length === 0) {
            return <img src={emptyPhotos} alt="no photos" />
        }
        if (photos && photos.length > 0) {
            let gallery = [];
            photos.map(photo => {
                gallery.push({
                    id: photo.id,
                    title: photo.title,
                    original: photo.url,
                    thumbnail: photo.thumbnailUrl,
                    description: photo.title,
                })
            })
            return <ImageGallery 
                        items={gallery}
                        showPlayButton={false}
                        showFullscreenButton={false}
                    />;
        }
    }

    return (
        <div className="photos-container">
            {prepareGallery()}
        </div>
    )
}