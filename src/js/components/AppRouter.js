import React, { Component } from "react";
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import MainPanel from './MainPanel';

export default class AppRouter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Route exact path='/playlist/:id' component={MainPanel} />
        <Route exact path='/artist/:id' component={MainPanel} />
        <Route exact path='/album/:id' component={MainPanel} />
        <Route exact path='/album/:id/:trackid' component={MainPanel} />
        <Route exact path='/savedalbums' component={MainPanel} />
        <Route exact path='/savedtracks' component={MainPanel} />
        <Route exact path='/search' component={MainPanel} />
        <Route exact path='/' component={MainPanel} />
      </Router>
    )
  }
}