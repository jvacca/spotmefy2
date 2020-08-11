import React, { Component } from "react";
import {connect} from 'react-redux';
import * as Actions from '../actions'
import TrackItem from './TrackItem';
import * as Utils from '../utils';

const SimpleTrackList = ({id, tracks, artists, images, currentTrackIndex, onPlayTrack, selectedTrackId}) => {

  return (
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
        tracks.items.map( (item, index) => {
          let isActive = (currentTrackIndex === index)

          return (
            <TrackItem
              key={index}
              index={index + 1}
              trackName={item.name}
              trackData={item}
              artists={artists}
              albumName={''}
              duration={item.duration_ms}
              group_id={id}
              album_id={''}
              album_images={images}
              songPath={item.preview_url}
              active={isActive}
              isAlbumView={true}
              onPlayTrack = {onPlayTrack}
            />
          )
        })
      }
    </ol>
  )
}

const mapStateToProps = state => ({
  currentTrackIndex: state.queue.currentTrackIndex,
  data: state.fetchedData['albumTracks']
});

const mapDispatchToProps = dispatch => ({
  playSingleTrack: (data) => dispatch(Actions.playSingleTrack(data)),
  playAlbum: (data) => dispatch(Actions.playAlbum(data)),
  resetCurrentTrackIndex: () => dispatch(Actions.resetCurrentTrackIndex()),
  load: (which, id) => dispatch(Actions.load(which, id))
});

class AlbumPanelComponent extends Component {
  constructor(props) {
    super(props);

    this.onPlayTrack = this.onPlayTrack.bind(this)
  }

  loadAlbum(id) {
    let callPromise = this.props.load('albumTracks', id, (data) => {
      //console.log('data: ', data);
      this.setState({
        data: data
      }, () => {
        if (typeof this.props.match.params.trackid !== 'undefined') {
          let sindex;
          let search_index = data.tracks.items.map((item, index) => {
            if (item.id === this.props.match.params.trackid) sindex = index
          });
          console.log("found index ", sindex)
          if (sindex !== -1) this.onPlayTrack(sindex);
        }
      });
    });
  }

  componentDidMount() {
    this.props.resetCurrentTrackIndex();
    let callPromise = this.props.load('albumTracks', this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      let callPromise = this.props.load('albumTracks', this.props.match.params.id);
    }
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

    this.props.save('getPutSavedAlbums', id, data => {
      console.log('********SAVED', data)
    })
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
          <SimpleTrackList
            id = {id}
            tracks = {tracks}
            artists = {artists}
            images = {images}
            currentTrackIndex = {this.props.currentTrackIndex}
            onPlayTrack = {this.onPlayTrack}
          />
        </div>
      );
      } else {
        return <div></div>
      }
  }
}

const AlbumPanel = connect(mapStateToProps, mapDispatchToProps)(AlbumPanelComponent);

export default AlbumPanel