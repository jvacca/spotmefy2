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
  playPlaylist: (data) => dispatch(Actions.playPlaylist(data)),
  resetCurrentTrackIndex: () => dispatch(Actions.resetCurrentTrackIndex())
});

class PlaylistPanelComponent extends Component {
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
      console.log('data: ', data);
      this.setState({
        data: data
      });
    });
  }

  componentDidMount() {
    //console.log("Mounted!")
    this.props.resetCurrentTrackIndex();
    this.loadPlaylist(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    //console.log("Updated!");
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.props.resetCurrentTrackIndex();
      this.loadPlaylist(this.props.match.params.id);
    }
    
  }

  onPlayPlaylist(tracks) {
    let eventData={
      id: this.props.match.params.id,
      tracks: this.state.data.tracks.items
    }
    
    this.props.playPlaylist(eventData);
  }

  onPlayTrack(index) {
    let eventData={
      id: this.props.match.params.id,
      panel: 'playlist',
      tracks: this.state.data.tracks.items,
      index: index
    }
    
    this.props.playSingleTrack(eventData);
  }

  render() {
    if (this.state.data !== null) { 
      let {id, name, tracks, images, owner} = this.state.data;
      return (
      <div className="playlist-panel">
        <div className="album-cover"><img src={this.model.getImages(images)} /></div>
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