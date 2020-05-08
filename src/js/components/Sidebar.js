import React, { Component } from "react";
import {Link} from 'react-router-dom';
import Model from '../model';

export default class Sidebar extends Component {
  constructor() {
    super();

    this.model = new Model();
    this.state = {
      data: null
    };
  }

  componentDidMount() {
    let callPromise = this.model.load('playlists',null, (data) => {
      console.log('sidebar data: ', data);
      this.setState({
        data: data
      });
    });
  }

  render() {
    return (
      <div className="side-panel">
        <p>YOUR LIBRARY</p>
        <ul>
          <li><a id="recent" href="#">Recently Played</a></li>
          <li><a id="songs" href="#">Liked Songs</a></li>
          <li><a id="albums" href="#">Albums</a></li>
          <li><a id="artists" href="#">Artists</a></li>
        </ul>
        <p>PLAYLISTS</p>
        <ul className="playlist-container">
          {
            this.state.data && this.state.data.items.map( (item, index) => {
              return (
                <li key={index}>
                  <Link to={'/playlist/' + item.id}>
                    <span className="playlist-name">{item.name}</span> 
                  </Link>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}