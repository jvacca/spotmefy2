import React, { Component } from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Link} from 'react-router-dom';
import Heading from './Heading';
import Sidebar from './Sidebar';
import Playlist from './Playlist';
import ArtistDisplay from './ArtistDisplay';
import AlbumTracksView from './AlbumTracksView';

export default class MainPanel extends Component {
  constructor() {
    super();

    this.state = {
      currentViewState: ""
    };
  }

  render() {
    
    return (
      <div className="app-container">
        <div id="frame" className="frame">
            <Router>
              <Sidebar />
              <div className="main-panel">
                  <Route path='/' component={Heading} />
                  <Route path='/playlist/:playlist_id' component={Playlist} />
                  <Route path='/artist/:artist_id' component={ArtistDisplay} />
                  <Route path='/album/:album_id' component={AlbumTracksView} />
              </div>
            </Router>
          
        </div>
        <div className="media-player"></div>
      </div>
    );
  }
}
