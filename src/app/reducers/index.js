import selectedUser from './selectedUser';
import selectedAlbum from './selectedAlbum';
import albumModalStatus from './albumModalStatus';
import userDropMenuStatus from './userDropMenuStatus'
import { combineReducers } from 'redux';

export default combineReducers({ 
  selectedUser,
  selectedAlbum,
  albumModalStatus,
  userDropMenuStatus
});