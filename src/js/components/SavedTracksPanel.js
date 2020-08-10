import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as Actions from '../actions';
import TrackList from './TrackList';
import Model from '../model';

const mapStateToProps = state => ({
  currentTrackIndex: state.queue.currentTrackIndex
});

const mapDispatchToProps = dispatch => ({
  playSingleTrack: (data) => dispatch(Actions.playSingleTrack(data)),
  playAllSavedTracks: (data) => dispatch(Actions.playPlaylist(data)),
  resetCurrentTrackIndex: () => dispatch(Actions.resetCurrentTrackIndex())
});

class SavedTracksPanelComponent extends Component {
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
      //console.log('data: ', data);
      
      this.setState({
        data: data
      });
    });
  }

  componentDidMount() {
    //console.log("Mounted!")
    this.props.resetCurrentTrackIndex();
    this.loadTracks(this.props.id);
  }

  componentDidUpdate(prevProps) {
    
  }

  onPlaySavedTracks() {
    let eventData={
      id: this.props.id,
      tracks: this.state.data.items
    }

    this.props.playAllSavedTracks(eventData);
  }

  onPlayTrack(index) {
    let eventData={
      id: this.props.id,
      panel: 'savedtracks',
      tracks: this.state.data.items,
      index: index
    }
    
    this.props.playSingleTrack(eventData);
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

const SavedTracksPanel = connect(mapStateToProps, mapDispatchToProps)(SavedTracksPanelComponent)

export default SavedTracksPanel