import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './user.scss';
import { useSelector, useDispatch } from 'react-redux';
import { noAlbum, changeUser, dropdownStatus } from "../../app/actions.js";
import { trackPromise } from 'react-promise-tracker';
import { RiArrowDropDownLine } from "react-icons/ri";

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';

async function getUsers() {
    try {
        const response = await axios.get('/users');
        return response.data;
    } catch (error) {
        console.error(error);
    }
} 

export function Users() {

    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();
    const selectedUserID = useSelector(state => state.selectedUser);
    const dropdownHidden = useSelector(state => state.userDropMenuStatus);

    useEffect(() => {
        const get = async () => {
            const result = await trackPromise(getUsers());
            if (result) {
                setUsers(result);
            }
        }
        get();
    },[]);

    function activeUser(user){
        if (user.id === selectedUserID) {
            return <button className="active-user" key={user.id}>{user.name} </button>
        }
    }

    function listUsers(user) {
        return <button className="user" key={user.id} onClick={()=>{
            dispatch(changeUser(user.id));
            dispatch(noAlbum());
            dispatch(dropdownStatus());
        }}
        >{user.name} </button>
    }
    
    return (
        <div>
            <h2 className="headline-user">SELECTED USER</h2>
            <div className="users-container">
                <div className="users-list">
                    {users.map(user => activeUser(user))}
                </div>
                <button className="user-dropdown-btn" onClick={() => dispatch(dropdownStatus())}><RiArrowDropDownLine /></button>
            </div>
            <div className={dropdownHidden ? "user-dropdown-menu" : "hidden-dropdown-menu"}>
                {users.map(user => listUsers(user))}
            </div>
        </div>
    )
}