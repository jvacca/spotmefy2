import React, { Component } from "react";
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import {Link} from 'react-router-dom';
import MainPanel from './MainPanel';
import Sidebar from './Sidebar';
import MediaPlayer from './MediaPlayer';
import Model from '../model';

export default class AppRouter extends Component {
  constructor(props) {
    super(props);
    this.model = new Model();
    
  }

  render() {
    return (
      <div className="app-container">
        <div id="frame" className="frame">
          <Router>
            <Sidebar />
            <div className="main-panel">
              <Link to="/search">Search</Link>
              <Route exact path='/playlist/:id' component={MainPanel} />
              <Route exact path='/artist/:id' component={MainPanel} />
              <Route exact path='/album/:id' component={MainPanel} />
              <Route exact path='/album/:id/:trackid' component={MainPanel} />
              <Route exact path='/savedalbums' component={MainPanel} />
              <Route exact path='/savedtracks' component={MainPanel} />
              <Route exact path='/search' component={MainPanel} />
              <Route exact path='/' component={MainPanel} />
            </div>
          </Router>
          
        </div>
      </div>
    )
  }
}