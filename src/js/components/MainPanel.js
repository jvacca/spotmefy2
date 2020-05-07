import React, { Component } from "react";
import {Link} from 'react-router-dom';

export default class MainPanel extends Component {
  constructor() {
    super();

    this.state = {
      currentViewState: ""
    };
  }

  render() {
    let playlist_link = "/playlist/1AxmCxi4kmVM3pwwqqq2sD";
    return (
      <div>
        <h1>SPOTMEFY</h1>
        <Link to={playlist_link}>Playlist</Link>
      </div>
    );
  }
}