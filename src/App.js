import React from 'react';
import './App.css';
import { Users }from './components/users/Users';
import { Albums } from './components/albums/Albums';
import { Photos } from './components/photos/Photos';

export default function App() {
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
    </div>
  );
}
