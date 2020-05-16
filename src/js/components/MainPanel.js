import React, { Component } from "react";
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import {Link} from 'react-router-dom';
import Heading from './Heading';
import Sidebar from './Sidebar';
import Playlist from './Playlist';
import ArtistDisplay from './ArtistDisplay';
import AlbumTracksView from './AlbumTracksView';
import MediaPlayer from './MediaPlayer';

export default class MainPanel extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="app-container">
        <div id="frame" className="frame">
            <Router>
              <Sidebar />
              <div className="main-panel">
                  <Route exact path='/heading' component={Heading} />
                  <Route exact path='/playlist/:playlist_id' component={Playlist} />
                  <Route exact path='/artist/:artist_id' component={ArtistDisplay} />
                  <Route exact path='/album/:album_id' component={AlbumTracksView} />
                  <Route exact path='/'>
                    <Redirect to='/heading' />
                  </Route>
              </div>
            </Router>
        </div>
        <MediaPlayer />
      </div>
    );
  }
}
