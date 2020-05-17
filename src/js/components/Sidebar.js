import React, { Component } from "react";
import {Link} from 'react-router-dom';
import Model from '../model';

export default class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.model = new Model();
    this.state = {
      data: null
    };
  }

  componentDidMount() {
    let callPromise = this.model.load('playlists',null, (data) => {
      //console.log('sidebar data: ', data);
      this.setState({
        data: data
      });
    });
  }

  componentDidUpdate() {
    //console.log("Updated!");
  }

  render() {
    return (
      <div className="side-panel">
        <p>YOUR LIBRARY</p>
        <ul>
          <li><a id="recent" href="#">Recently Played</a></li>
          <li><a id="songs" href="#">Liked Songs</a></li>
          <li><Link to={'/album/1g4vEVvVVFvFju0gS0DMbh'}>Albums</Link></li>
          <li><Link to={'/artist/4CvTDPKA6W06DRfBnZKrau'}>Artist</Link></li>
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