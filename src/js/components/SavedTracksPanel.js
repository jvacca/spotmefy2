import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as Actions from '../actions';
import TrackList from './TrackList';
import Utils from '../utils';

const mapStateToProps = state => ({
  currentTrackIndex: state.queue.currentTrackIndex,
  data: state.fetchedData['getPutSavedTracks']
});

const mapDispatchToProps = dispatch => ({
  playSingleTrack: (data) => dispatch(Actions.playSingleTrack(data)),
  playAllSavedTracks: (data) => dispatch(Actions.playPlaylist(data)),
  resetCurrentTrackIndex: () => dispatch(Actions.resetCurrentTrackIndex()),
  load: (which, id) => dispatch(Actions.load(which, id))
});

class SavedTracksPanelComponent extends Component {
  constructor(props) {
    super(props);

    this.onPlayTrack = this.onPlayTrack.bind(this)
    this.onPlaySavedTracks = this.onPlaySavedTracks.bind(this)
  }

  componentDidMount() {
    //console.log("Mounted!")
    this.props.resetCurrentTrackIndex();
    let callPromise = this.props.load('getPutSavedTracks', null);
  }

  componentDidUpdate(prevProps) {
    
  }

  onPlaySavedTracks() {
    let eventData={
      id: this.props.id,
      tracks: this.props.data.items
    }

    this.props.playAllSavedTracks(eventData);
  }

  onPlayTrack(index) {
    let eventData={
      id: this.props.id,
      panel: 'savedtracks',
      tracks: this.props.data.items,
      index: index
    }
    
    this.props.playSingleTrack(eventData);
  }

  render() {
    if (this.props.data) { 
      let {id, items} = this.props.data;
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

const SavedTracksPanel = connect(mapStateToProps, mapDispatchToProps)(SavedTracksPanelComponent)

export default SavedTracksPanel