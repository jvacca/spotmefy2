import React, { Component } from 'react';
import TrackList from './TrackList';
import Model from '../model';

export default class PlaylistPanel extends Component {
  constructor(props) {
    super(props);

    this.model = new Model();
    this.onPlayTrack = this.onPlayTrack.bind(this)
    this.state = {
      data: null
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

  onPlayPlaylist(tracks) {
    let eventData={
      id: this.props.id,
      tracks: this.state.data.tracks.items
    }
    this.model.pubsub.emit('playPlaylist', eventData);
  }

  onPlayTrack(index) {
    let eventData={
      id: this.props.id,
      tracks: this.state.data.tracks.items,
      index: index
    }
    this.model.pubsub.emit('playTrack', eventData);
  }

  render() {
    if (this.state.data !== null) { 
      let {id, name, tracks, images, owner} = this.state.data;
      return (
      <div className="playlist-panel">
        <div className="album-cover"><img src={this.model.getImages(images)} /></div>
        <div className="heading">
          <p>PLAYLIST</p>
          <h1>{name}</h1>
          <p>By <span className="hilight">{owner.display_name}</span></p>
          <p>{tracks.items.length} songs</p>
          <a className="play_button" onClick={e => {this.onPlayPlaylist(tracks)}}>PLAY</a>
        </div>
        <TrackList
          id= {id}
          tracks= {tracks.items}
          currentTrackIndex={this.props.currentTrackIndex}
          onPlayTrack = {this.onPlayTrack}
        />
      </div>
    )} else {
      return <div></div>
    }
  }
}