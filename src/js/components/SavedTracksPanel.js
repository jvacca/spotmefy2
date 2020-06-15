import React, { Component } from 'react';
import TrackItem from './TrackItem';
import Model from '../model';

export default class SavedTracksPanel extends Component {
  constructor(props) {
    super(props);

    this.model = new Model();
    this.onPlayTrack = this.onPlayTrack.bind(this)
    this.onPlaySavedTracks = this.onPlaySavedTracks.bind(this)
    this.state = {
      data: null
    };
  }

  loadTracks() {
    let callPromise = this.model.load('getPutSavedTracks', '', (data) => {
      console.log('data: ', data);
      
      this.setState({
        data: data
      });
    });
  }

  componentDidMount() {
    //console.log("Mounted!")
    this.loadTracks(this.props.id);
  }
/*
  componentDidUpdate(prevProps) {
    //console.log("Updated!");
    //if (prevProps.id !== this.props.id) {
      this.loadTracks(this.props.id);
    //}
    
  }*/

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

  onPlaySavedTracks() {
    let eventData={
      id: this.props.id,
      tracks: this.state.data.items
    }
    this.model.pubsub.emit('playSavedTracks', eventData);
  }

  onPlayTrack(index) {
    let eventData={
      id: this.props.id,
      tracks: this.state.data.items,
      index: index
    }
    this.model.pubsub.emit('playTrack', eventData);
  }

  render() {
    if (this.state.data !== null) { 
      
      return (
      <div className="saved-tracks-panel">
        <div className="heading">
          <h1>Liked Songs</h1>
          <a className="play_button" onClick={this.onPlaySavedTracks}>PLAY</a>
        </div>
        <ol>
      <li className="header">
        <p>
          <span className="index">#</span>
          <span className="like"></span>
          <span className="song-name">TITLE</span>
          <span className="artist-name"></span>
          <span className="album-name"></span>
          <span className="duration">DURATION</span>
        </p>
      </li>
      {
        this.state.data.items.map( (item, index) => {
          let isActive = (index === this.props.currentTrackIndex)? true: false;

          return (
            <TrackItem
              key={index}
              index={index + 1}
              trackName={item.track.name}
              trackData={item}
              artists={item.track.artists}
              albumName={''}
              duration={item.track.duration_ms}
              group_id={''}
              album_id={''}
              album_images={item.track.album.images}
              songPath={item.track.preview_url}
              active={isActive}
              isAlbumView={true}
              onPlayTrack = {this.onPlayTrack}
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