import React, { Component } from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as Actions from '../actions'
import {Link} from 'react-router-dom';
import TrackItem from './TrackItem';
import * as Utils from '../utils';

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

const mapStateToProps = state => ({
  currentTrackIndex: state.queue.currentTrackIndex,
  userData: state.fetchedData['userprofile'],
  topTracks: state.fetchedData['history']
});

const mapDispatchToProps = dispatch => ({
  playSingleTrack: (data) => dispatch(Actions.playSingleTrack(data)),
  load: (which, id) => dispatch(Actions.fetchData(which, id))
});

class UserComponent extends Component {
  constructor(props) {
    super(props);

    this.onPlayTrack = this.onPlayTrack.bind(this);
  }

  componentDidMount() {
    let callPromise = this.props.load('userprofile', null);
    let callPromise2 = this.props.load('history', null);
  }

  onPlayTrack(index) {
    let eventData={
      id: this.props.id,
      panel: 'user',
      tracks: this.props.topTracks.items,
      index: index
    }

    this.props.playSingleTrack(eventData);
  }

  render() {
    console.log(this.props.topTracks, this.props.userData)
    if (this.props.topTracks && this.props.userData) { 
      
      let {items} = this.props.topTracks;
      let user = this.props.userData;
      return (
        <div className="user-panel">
          <div className="album-cover"><img src={Utils.getImages(user.images)} /></div>
          <div className="heading">
            <p className="heading-label">USER</p>
            <h1>{user.display_name}</h1>
          </div>
          <h3>Top Tracks</h3>
          <SimpleTrackList
            id = {''}
            tracks = {items}
            currentTrackIndex = {this.props.currentTrackIndex}
            onPlayTrack = {this.onPlayTrack}
          />
        </div>
      )
    } else {
      return <div></div>
    }
  }
}

UserComponent.propTypes = {
  currentTrackIndex: PropTypes.number,
  userData: PropTypes.object,
  topTracks: PropTypes.object,
  playSingleTrack: PropTypes.func,
  load: PropTypes.func
}

const User = connect(mapStateToProps, mapDispatchToProps)(UserComponent);
export default User