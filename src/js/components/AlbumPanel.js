import React, { Component } from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as Actions from '../actions'
import TrackItem from './TrackItem';
import * as Utils from '../utils';
import SimplerTrackList from './SimplerTrackList';

const mapStateToProps = state => ({
  currentTrackIndex: state.queue.currentTrackIndex,
  data: state.fetchedData['albumTracks']
});

const mapDispatchToProps = dispatch => ({
  playSingleTrack: (data) => dispatch(Actions.playSingleTrack(data)),
  playAlbum: (data) => dispatch(Actions.playAlbum(data)),
  resetCurrentTrackIndex: () => dispatch(Actions.resetCurrentTrackIndex()),
  load: (which, id) => dispatch(Actions.fetchData(which, id)),
  save: (which, id) => dispatch(Actions.saveData(which, id))
});

class AlbumPanelComponent extends Component {
  constructor(props) {
    super(props);

    this.onPlayTrack = this.onPlayTrack.bind(this);
    this.callPromise = null;
  }

  componentDidMount() {
    this.props.resetCurrentTrackIndex();
    this.callPromise = this.props.load('albumTracks', this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      let callPromise = this.props.load('albumTracks', this.props.match.params.id);
    }

    console.log("on update")
      this.callPromise.then( () => {
        console.log("data returned")
        if (typeof this.props.match.params.trackid !== 'undefined') {
          let sindex;
          let search_index = this.props.data.tracks.items.map((item, index) => {
            if (item.id === this.props.match.params.trackid) sindex = index
          });
          console.log("found index ", sindex)
          if (sindex !== -1) this.onPlayTrack(sindex);
        }
      })
  }

  onPlayAlbum(tracks) {
    let eventData={
      id: this.props.match.params.id,
      tracks: this.props.data.tracks.items,
      album_images: this.props.data.images
    }
    
    this.props.playAlbum(eventData);
  }

  onPlayTrack(index) {
    let eventData={
      id: this.props.match.params.id,
      panel: 'album',
      tracks: this.props.data.tracks.items,
      album_images: this.props.data.images,
      index: index
    }

    this.props.playSingleTrack(eventData);
  }

  onLikeAlbum(id) {
    console.log("like album ", this.props.data);

    let callPromise = this.props.save('getPutSavedAlbums', id);
  }

  render() {
    if (this.props.data) { 
      let {id, images, name, artists, tracks, release_date, total_tracks} = this.props.data;
      
      return (
        <div className="album-panel">
          <div className="album-cover"><img src={Utils.getImages(images)} /></div>
          <div className="heading">
            <p className="heading-label">ALBUM</p>
            <h1>{name}</h1>
            <p>By <span className="hilight">{artists[0].name}</span></p>
            <p>{release_date} . {total_tracks} songs</p>
            <a className="play_button" onClick={e => {this.onPlayAlbum(tracks)}}>PLAY</a><a onClick={e => this.onLikeAlbum(id)} className="likeAlbum">&hearts;</a>
          </div>
          <SimplerTrackList
            id = {id}
            tracks = {tracks.items}
            artists = {artists}
            images = {images}
            currentTrackIndex = {this.props.currentTrackIndex}
            onPlayTrack = {this.onPlayTrack}
            isAlbumView = {true}
          />
        </div>
      );
      } else {
        return <div></div>
      }
  }
}

AlbumPanelComponent.propTypes = {
  currentTrackIndex: PropTypes.number,
  data: PropTypes.object,
  playSingleTrack: PropTypes.func,
  playAlbum: PropTypes.func,
  resetCurrentTrackIndex: PropTypes.func,
  load: PropTypes.func,
  save: PropTypes.func
}

const AlbumPanel = connect(mapStateToProps, mapDispatchToProps)(AlbumPanelComponent);

export default AlbumPanel