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
 
window.$ = $;
window.jQuery = jQuery;

$(document).ready(function(){
  console.log("Initializing");

  let getParameterByName = (name, url) => {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  let access_token = getParameterByName('access_token');
  let refresh_token = getParameterByName('refresh_token');

  
  
  $("#app").width(window.innerWidth);
  $("#app").height(window.innerHeight);

  let appModel = new Model();
  //let appRouter = new Router(appModel);
  //appRouter.initialize();

  ReactDOM.render ((
    <Router>
      <Route path='/' component={MainPanel} />
      <Route path='/playlist/:playlist_id' component={Playlist} />
      <Route path='/artist/:artist_id' component={ArtistDisplay} />
      <Route path='/album/:album_id' component={AlbumTracksView} />
      
    </Router>
  ), document.getElementById('main-panel'));

  

});