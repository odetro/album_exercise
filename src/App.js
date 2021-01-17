import React from 'react';
import './App.css';
import { Users }from './components/users/Users';
import { Albums } from './components/albums/Albums';
import { Photos } from './components/photos/Photos';
import { usePromiseTracker } from 'react-promise-tracker';
import Loader from 'react-loader-spinner';

export default function App() {

  const LoadingIndicator = props => {
    const { promiseInProgress } = usePromiseTracker();
    return (
        promiseInProgress && 
        <div className="loading-status">
            <Loader type="ThreeDots" color="#002458" height={80} width={80} />
        </div>
    );  
  }

  return (
    <div className="App">
      <div className="top-bar"></div>
      <div className="app-container">
        <div className="app-right">
          <div className="app-users">
            <Users />
          </div>
          <div className="app-albums">
            <Albums />
          </div>
        </div>
        <div className="app-left">
          <div className="app-photos">
            <Photos />
          </div>
        </div>
      </div>
      <LoadingIndicator />
    </div>
  );
}
