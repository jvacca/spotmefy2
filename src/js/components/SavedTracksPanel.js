import React, { Component } from 'react';
import TrackList from './TrackList';
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

  componentDidUpdate(prevProps) {
    
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
      let {id, items} = this.state.data;
      return (
      <div className="saved-tracks-panel">
        <div className="heading">
          <h1>Liked Songs</h1>
          <a className="play_button" onClick={this.onPlaySavedTracks}>PLAY</a>
        </div>
        <TrackList
          id= {id}
          tracks= {items}
          currentTrackIndex={this.props.currentTrackIndex}
          onPlayTrack = {this.onPlayTrack}
        />
      </div>
    )} else {
      return <div></div>
    }
  }
}