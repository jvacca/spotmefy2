import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as Actions from '../actions'
import {Link} from 'react-router-dom';
import * as Utils from '../utils';

const mapDispatchToProps = dispatch => ({
  save: (which, id) => dispatch(Actions.saveData(which, id))
});

const TrackItemComponent = ({save, isAlbumView, index, trackName, trackData, artists, albumName, duration, active, album_id, added_at, onPlayTrack}) => {
  const getArtistLinks = (artists) => {    
    return artists.map((artist, index) => (
      <Link key={index} to={`/artist/${artist.id}`}>{artist.name}{(index < artists.length-1)? ', ' : ''}</Link>
    ));
  }

  const playTrack = (count) => {
    onPlayTrack(count)
  }

  const onLikeSong = (id) => {
    let callPromise = save('getPutSavedTracks', id);
  }
      
  return (
    <li className={(active === true)? 'active': ''}>
      <p>
        <span className="index">{(isAlbumView === false)? '' : index}</span>
        <span onClick={e => onLikeSong(trackData.id)} className="like">&hearts;</span>
        <span onClick={(e) => playTrack(index-1)} className="song-name">{trackName}</span>
        {(isAlbumView === false)? <span className="artist-name">{getArtistLinks(artists)}</span> : ''}
        {(isAlbumView === false)? <span className="album-name"><Link to={`/album/${album_id}`}>{albumName}</Link></span> : ''}
        {(isAlbumView === false)? <span className="date">{Utils.formatDate(added_at)}</span> : ''}
        <span className="duration">{Utils.formatDuration(duration)}</span>
      </p>
    </li>
  )
}

TrackItemComponent.propTypes = {
  save: PropTypes.func,
  isAlbumView: PropTypes.bool, 
  index: PropTypes.number, 
  trackName: PropTypes.string, 
  trackData: PropTypes.object, 
  albumName: PropTypes.string, 
  duration: PropTypes.number, 
  active: PropTypes.bool, 
  album_id: PropTypes.string, 
  added_at: PropTypes.string, 
  onPlayTrack: PropTypes.func
}

TrackItemComponent.defaultProps = {
  save: null,
  isAlbumView: false, 
  index: -1, 
  trackName: "", 
  trackData: null, 
  artists: null, 
  albumName: "", 
  duration: -1, 
  active: false, 
  album_id: "", 
  added_at: "", 
  onPlayTrack: null
}

const TrackItem = connect(null, mapDispatchToProps)(TrackItemComponent);
export default TrackItem;