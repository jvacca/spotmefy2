import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import * as Utils from '../utils';

export default class TrackItem extends Component {
  constructor(props) {
    super(props);

    this.playTrack = this.playTrack.bind(this);
  }

  getArtistLinks(artists) {    
    return artists.map((artist, index) => (
      <Link key={index} to={`/artist/${artist.id}`}>{artist.name}{(index < artists.length-1)? ', ' : ''}</Link>
    ));
  }

  playTrack(count) {
    this.props.onPlayTrack(count)
  }

  onLikeSong(id) {
    this.props.save('getPutSavedTracks', id, data => {
      console.log('********SAVED', data)
    })
  }

  render() {
    let {index, trackName, trackData, artists, albumName, duration, active, album_id, added_at} = this.props;
    
    return (
      <li className={(active === true)? 'active': ''}>
        <p>
          <span className="index">{(this.props.isAlbumView === false)? '' : index}</span>
          <span onClick={e => this.onLikeSong(trackData.id)} className="like">&hearts;</span>
          <span onClick={(e) => this.playTrack(index-1)} className="song-name">{trackName}</span>
          {(this.props.isAlbumView === false)? <span className="artist-name">{this.getArtistLinks(artists)}</span> : ''}
          {(this.props.isAlbumView === false)? <span className="album-name"><Link to={`/album/${album_id}`}>{albumName}</Link></span> : ''}
          {(this.props.isAlbumView === false)? <span className="date">{Utils.formatDate(added_at)}</span> : ''}
          <span className="duration">{Utils.formatDuration(duration)}</span>
        </p>
      </li>
    )
  }
}