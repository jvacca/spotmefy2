import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as Actions from '../actions';
import TrackList from './TrackList';
import * as Utils from '../utils';

const mapStateToProps = state => ({
  currentTrackIndex: state.queue.currentTrackIndex,
  data: state.fetchedData['playlistTracks']
});

const mapDispatchToProps = dispatch => ({
  playSingleTrack: (data) => dispatch(Actions.playSingleTrack(data)),
  playPlaylist: (data) => dispatch(Actions.playPlaylist(data)),
  resetCurrentTrackIndex: () => dispatch(Actions.resetCurrentTrackIndex()),
  load: (which, id) => dispatch(Actions.fetchData(which, id))
});

class PlaylistPanelComponent extends Component {
  constructor(props) {
    super(props);

    this.onPlayTrack = this.onPlayTrack.bind(this)
  }

  componentDidMount() {
    //console.log("Mounted!")
    this.props.resetCurrentTrackIndex();
    let callPromise = this.props.load('playlistTracks', this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    //console.log("Updated!");
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.props.resetCurrentTrackIndex();
      let callPromise = this.props.load('playlistTracks', this.props.match.params.id);
    }
    
  }

  onPlayPlaylist(tracks) {
    let eventData={
      id: this.props.match.params.id,
      tracks: this.props.data.tracks.items
    }
    
    this.props.playPlaylist(eventData);
  }

  onPlayTrack(index) {
    let eventData={
      id: this.props.match.params.id,
      panel: 'playlist',
      tracks: this.props.data.tracks.items,
      index: index
    }
    
    this.props.playSingleTrack(eventData);
  }

  render() {
    if (this.props.data) { 
      let {id, name, tracks, images, owner} = this.props.data;
      return (
      <div className="playlist-panel">
        <div className="album-cover"><img src={Utils.getImages(images)} /></div>
        <div className="heading">
          <p className="heading-label">PLAYLIST</p>
          <h1>{name}</h1>
          <p>Created by <span className="hilight">{owner.display_name}</span></p>
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

const PlaylistPanel = connect(mapStateToProps, mapDispatchToProps)(PlaylistPanelComponent);

export default PlaylistPanel;