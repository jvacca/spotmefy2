import React, { Component } from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as Actions from '../actions'
import {Link} from 'react-router-dom';
import TrackItem from './TrackItem';
import * as Utils from '../utils';
import SimplerTrackList from './SimplerTrackList';

const mapStateToProps = state => ({
  currentTrackIndex: state.queue.currentTrackIndex,
  userData: state.fetchedData['userprofile'],
  topTracks: state.fetchedData['history']
});

const mapDispatchToProps = dispatch => ({
  playSingleTrack: (data) => dispatch(Actions.playSingleTrack(data)),
  resetCurrentTrackIndex: () => dispatch(Actions.resetCurrentTrackIndex()),
  load: (which, id) => dispatch(Actions.fetchData(which, id))
});

class UserComponent extends Component {
  constructor(props) {
    super(props);

    this.onPlayTrack = this.onPlayTrack.bind(this);
  }

  componentDidMount() {
    this.props.resetCurrentTrackIndex();
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
          <SimplerTrackList
            id = {''}
            tracks = {items}
            artists = {''}
            images = {''}
            currentTrackIndex = {this.props.currentTrackIndex}
            onPlayTrack = {this.onPlayTrack}
            isAlbumView = {false}
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