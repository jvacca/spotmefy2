import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Model from '../model';

export default class Playlist extends Component {
  constructor() {
    super();

    this.model = new Model();
    this.state = {
      data: null
    };

  }
  
  formatDuration(ms) {
    return (Math.floor((ms/1000)/60) + ':' + Math.floor((ms/1000)%60));
  }

  componentDidMount() {
    console.log('***************' + this.props.match.params.playlist_id)
    let id = this.props.match.params.playlist_id;
    let callPromise = this.model.load('playlistTracks', id, (data) => {
      console.log('data: ', data);
      this.setState({
        data: data
      });
    });
  }

  render() {
    if (this.state.data !== null) { return (
      <div className="playlist-panel">
        <h1>{this.state.data.name}</h1>
        <p></p>

        <ol>
          <li className="header">
            <p>
              <span className="index">#</span> 
              <span className="song-name">TITLE</span>
              <span className="artist-name">ARTIST</span>
              <span className="album-name">ALBUM</span>
              <span className="duration">DURATION</span>
            </p>
          </li>
          {
            this.state.data.tracks.items.map( (item, index) => {
              let artist_link = "/artist/" + item.track.artists[0].id;
              let album_link = "/album/" + item.track.album.id;
              return (
                <li key={index}>
                  <p>
                    <span className="index">{index + 1}</span> 
                    <span className="song-name">{item.track.name}</span>
                    <span className="artist-name"><Link to={artist_link}>{item.track.artists[0].name}</Link></span>
                    <span className="album-name"><Link to={album_link}>{item.track.album.name}</Link></span>
                    <span className="duration">{this.formatDuration(item.track.duration_ms)}</span>
                  </p>
                </li>
              )
            })
          }
        </ol>

      </div>
    )} else {
      return <div></div>
    }
  }
}