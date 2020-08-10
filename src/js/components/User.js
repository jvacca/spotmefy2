import React, { Component } from "react";
import {Link} from 'react-router-dom';
import TrackItem from './TrackItem';
import Model from '../model';

const SimpleTrackList = ({id, tracks, currentTrackIndex, onPlayTrack}) => {

  return (
    <ol>
      <li className="header">
        <p>
          <span className="index">#</span>
          <span className="like"></span>
          <span className="song-name">TITLE</span>
          <span className="artist-name">ARTISTS</span>
          <span className="album-name">ALBUM</span>
          <span className="date">DATE</span>
          <span className="duration">DURATION</span>
        </p>
      </li>
      {
        tracks.map( (item, index) => {
          let isActive = (currentTrackIndex === index)

          return (
            <TrackItem
              key={index}
              index={index + 1}
              trackName={item.name}
              trackData={item}
              artists={item.artists}
              albumName={item.album.name}
              added_at={'1234'}
              duration={item.duration_ms}
              group_id={id}
              album_id={item.album.id}
              album_images={item.album.images}
              songPath={item.preview_url}
              active={isActive}
              isAlbumView={false}
              onPlayTrack = {onPlayTrack}
            />
          )
        })
      }
    </ol>
  )
}

export default class User extends Component {
  constructor(props) {
    super(props);

    this.model = new Model();
    this.onPlayTrack = this.onPlayTrack.bind(this);

    this.state = {
      userData: null,
      topTracks: null
    };
  }

  loadUserProfile() {
    let callPromise = this.model.load('userprofile', null, (data) => {
      //console.log('data: ', data);

      this.setState({
        userData: data
      });
    });
  }

  loadTopTracks() {
    let callPromise = this.model.load('history', null, (data) => {
      //console.log('data: ', data);

      this.setState({
        topTracks: data
      });
    });
  }

  componentDidMount() {
    this.loadUserProfile();
    this.loadTopTracks();
  }

  onPlayTrack(index) {
    let eventData={
      id: this.props.id,
      panel: 'user',
      tracks: this.state.topTracks.items,
      index: index
    }
    this.model.pubsub.emit('playTrack', eventData);
  }

  render() {
    if (this.state.userData && this.state.topTracks) { 
      let {items} = this.state.topTracks;
      return (
        <div className="user-panel">
          <div className="album-cover"><img src={this.model.getImages(this.state.userData.images)} /></div>
          <div className="heading">
            <p className="heading-label">USER</p>
            <h1>{this.state.userData.display_name}</h1>
          </div>
          <h3>Top Tracks</h3>
          <SimpleTrackList
            id = {''}
            tracks = {items}
            currentTrackIndex = {0}
            onPlayTrack = {this.onPlayTrack}
          />
        </div>
      )
    } else {
      return <div></div>
    }
  }
}