import React, { Component } from "react";
//import {Link} from 'react-router-dom';
import Model from '../model';

export default class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.model = new Model();
    this.state = {
      data: null,
      currentIndex: -1
    };

    this.select = this.select.bind(this);
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

  select(e, count, id) {
    e.preventDefault();
    this.setState({
      currentIndex: count
    });

    let eventdata={
      panel: 'playlist',
      id: id
    }

    this.model.pubsub.emit('selectPlaylist', eventdata)
  }

  render() {
    return (
      <div className="side-panel">
        <p>YOUR LIBRARY</p>
        <ul>
          <li><a id="recent" href="#">Recently Played</a></li>
          <li><a id="songs" href="#">Liked Songs</a></li>
        </ul>
        <p>PLAYLISTS</p>
        <ul className="playlist-container">
          {
            this.state.data && this.state.data.items.map( (item, index) => {
              let classNameName = (index === this.state.currentIndex)? 'active': ''
              return (
                <li key={index} className={classNameName}>
                  <a href="#" onClick={(e) => { this.select(e, index, item.id) }} >
                    <span className="playlist-name">{item.name}</span> 
                  </a>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}