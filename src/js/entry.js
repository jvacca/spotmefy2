import '../scss/page.scss';
import Model from './model';
//import Router from './router';
import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import ReactDOM from 'react-dom';
import MainPanel from './components/MainPanel';
import Playlist from './components/Playlist';
import ArtistDisplay from './components/ArtistDisplay';
import AlbumTracksView from './components/AlbumTracksView';


console.log("Initializing");

document.getElementById('app').style.width = window.innerWidth + 'px';
document.getElementById('app').style.height = window.innerHeight + 'px';

let appModel = new Model();

ReactDOM.render ((
  <Router>
    <Route path='/' component={MainPanel} />
    <Route path='/playlist/:playlist_id' component={Playlist} />
    <Route path='/artist/:artist_id' component={ArtistDisplay} />
    <Route path='/album/:album_id' component={AlbumTracksView} />
    
  </Router>
), document.getElementById('main-panel'));
