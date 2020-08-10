import React, { Component } from "react";
import {connect} from 'react-redux';
import * as Actions from '../actions'
import TrackItem from './TrackItem';
import Model from '../model';

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
  currentTrackIndex: state.queue.currentTrackIndex
});

const mapDispatchToProps = dispatch => ({
  playSingleTrack: (data) => dispatch(Actions.playSingleTrack(data)),
  playAlbum: (data) => dispatch(Actions.playAlbum(data)),
  resetCurrentTrackIndex: () => dispatch(Actions.resetCurrentTrackIndex())
});

class AlbumPanelComponent extends Component {
  constructor(props) {
    super(props);

    this.model = new Model();
    this.onPlayTrack = this.onPlayTrack.bind(this)
    this.state = {
      data: null
    };
  }

  loadAlbum(id) {
    let callPromise = this.model.load('albumTracks', id, (data) => {
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
    this.loadAlbum(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.loadAlbum(this.props.match.params.id);
    }
  }

  onPlayAlbum(tracks) {
    let eventData={
      id: this.props.match.params.id,
      tracks: this.state.data.tracks.items,
      album_images: this.state.data.images
    }
    
    this.props.playAlbum(eventData);
  }

  onPlayTrack(index) {
    let eventData={
      id: this.props.match.params.id,
      panel: 'album',
      tracks: this.state.data.tracks.items,
      album_images: this.state.data.images,
      index: index
    }

    this.props.playSingleTrack(eventData);
  }

  onLikeAlbum(id) {
    console.log("like album ", this.state.data);

    this.model.save('getPutSavedAlbums', id, data => {
      console.log('********SAVED', data)
    })
  }

  render() {
    if (this.state.data !== null) { 
      let {id, images, name, artists, tracks, release_date, total_tracks} = this.state.data;
      
      return (
        <div className="album-panel">
          <div className="album-cover"><img src={this.model.getImages(images)} /></div>
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