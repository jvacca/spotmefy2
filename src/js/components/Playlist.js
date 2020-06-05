import React, { Component } from 'react';
import TrackList from './TrackList';
import Model from '../model';

export default class Playlist extends Component {
  constructor(props) {
    super(props);

    this.model = new Model();
    this.state = {
      data: null,
    };
  }

  loadPlaylist(id) {
    let callPromise = this.model.load('playlistTracks', id, (data) => {
      //console.log('data: ', data);
      this.setState({
        data: data
      });
    });

  }

  componentDidMount() {
    //console.log("Mounted!")
    this.loadPlaylist(this.props.id);
  }

  componentDidUpdate(prevProps) {
    //console.log("Updated!");
    if (prevProps.id !== this.props.id) {
      this.loadPlaylist(this.props.id);
    }
    
  }

  getImages(album_images) {
    if (album_images.length > 0) {
      if (album_images.length > 1) 
        return album_images[1].url;
      else
        return album_images[0].url
    } else {
      return null;
    }
  }

  onPlay(tracks) {
    console.log("playing ", tracks);
  }

  render() {
    if (this.state.data !== null) { 
      let {name, tracks, images, owner} = this.state.data;
      return (
      <div className="playlist-panel">
        <div className="album-cover"><img src={this.getImages(images)} /></div>
        <div className="heading">
          <p>PLAYLIST</p>
          <h1>{name}</h1>
          <p>By <span className="hilight">{owner.display_name}</span></p>
          <p>{tracks.items.length} songs</p>
          <a className="play_button" onClick={e => {this.onPlay(tracks)}}>PLAY</a>
        </div>
          <TrackList
            playlist= {this.state.data.id}
            tracks= {tracks.items}
            currentTrackIndex={this.props.currentTrackIndex}
          />
      </div>
    )} else {
      return <div></div>
    }
  }
}