import React, { Component } from "react";
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import {Provider} from 'react-redux';
import {Link} from 'react-router-dom';
import MediaPlayer from './MediaPlayer';
import User from './User';
import PlaylistPanel from './PlaylistPanel';
import ArtistPanel from './ArtistPanel';
import AlbumPanel from './AlbumPanel';
import SavedAlbumsPanel from './SavedAlbumsPanel';
import SavedTracksPanel from './SavedTracksPanel';
import Search from './Search';
import Sidebar from './Sidebar';

export default class AppRouter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store = {this.props.store}>
      <div className="app-container">
        <div id="frame" className="frame">
          <Router>
            <Sidebar />
            <div className="main-panel">
              <Link to="/search">Search</Link>
              <Route exact path='/playlist/:id' component={PlaylistPanel} />
              <Route exact path='/artist/:id' component={ArtistPanel} />
              <Route exact path='/album/:id' component={AlbumPanel} />
              <Route exact path='/album/:id/:trackid' component={AlbumPanel} />
              <Route exact path='/savedalbums' component={SavedAlbumsPanel} />
              <Route exact path='/savedtracks' component={SavedTracksPanel} />
              <Route exact path='/search' component={Search} />
              <Route exact path='/' component={User} />
              <MediaPlayer  />
            </div>
          </Router>
        </div>
      </div>
      </Provider>
    )
  }
}