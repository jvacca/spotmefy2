import React, { Component } from "react";
import {Link} from 'react-router-dom';
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

  select(count) {
    //console.log("count ", count)
    this.setState({
      currentIndex: count
    });
  }

  render() {
    //console.log("state ", this.state.currentIndex)
    return (
      <div className="side-panel">
        <p>YOUR LIBRARY</p>
        <ul>
          <li><Link to="/savedalbums">Liked Albums</Link></li>
          <li><Link to="/savedtracks">Liked Songs</Link></li>
        </ul>
        <p>PLAYLISTS</p>
        <ul className="playlist-container">
          {
            this.state.data && this.state.data.items.map( (item, index) => {
              let classNameName = (index === this.state.currentIndex)? 'active': ''
              return (
                <li key={index} className={classNameName}>
                  <Link to={`/playlist/${item.id}`} onClick={e => {this.select(index)}}>
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