import React, { Component } from 'react';
import TrackItem from './TrackItem';
import Model from '../model';

export default class Playlist extends Component {
  constructor() {
    super();

    this.model = new Model();
    this.state = {
      data: null,
      currentId: null
    };
  }

  componentDidMount() {
    //console.log("Mounted!")
    let id = this.props.match.params.playlist_id;
    let callPromise = this.model.load('playlistTracks', id, (data) => {
      //console.log('data: ', data);
      this.setState({
        data: data,
        currentId: id
      });
    });
  }

  componentDidUpdate() {
    //console.log("Updated!");
    if (this.state.currentId === this.props.match.params.playlist_id) return

    let id = this.props.match.params.playlist_id;
    let callPromise = this.model.load('playlistTracks', id, (data) => {
      //console.log('data: ', data);
      this.setState({
        data: data,
        currentId: id
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
              return (
                <TrackItem
                  key={index}
                  index={index + 1}
                  trackName={item.track.name}
                  trackData={item.track}
                  artistName={item.track.artists[0].name}
                  albumName={item.track.album.name}
                  duration={item.track.duration_ms}
                  artist_id={item.track.artists[0].id}
                  album_id={item.track.album.id}
                  album_image={item.track.album.images[2].url}
                  songPath={item.track.preview_url}
                />
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