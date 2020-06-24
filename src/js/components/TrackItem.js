import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Model from '../model';

export default class TrackItem extends Component {
  constructor(props) {
    super(props);

    this.model = new Model();
    this.playTrack = this.playTrack.bind(this);
  }

  formatDuration(ms) {
    let time = ''
    let minutes = Math.floor((ms/1000)/60);
    let seconds = Math.floor((ms/1000)%60);
    time += (minutes < 10)? '0': '';
    time += minutes + ':';
    time += (seconds < 10)? '0': '';
    time += seconds;
    return time;
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
    this.model.save('getPutSavedTracks', id, data => {
      console.log('********SAVED', data)
    })
  }

  render() {
    let {index, trackName, trackData, artists, albumName, duration, active, album_id} = this.props;
    
    return (
      <li className={(active === true)? 'active': ''}>
        <p>
          <span className="index">{index}</span>
          <span onClick={e => this.onLikeSong(trackData.id)} className="like">&hearts;</span>
          <span onClick={(e) => this.playTrack(index-1)} className="song-name">{trackName}</span>
          {(this.props.isAlbumView === false)? <span className="artist-name">{this.getArtistLinks(artists)}</span> : ''}
          {(this.props.isAlbumView === false)? <span className="album-name"><Link to={`/album/${album_id}`}>{albumName}</Link></span> : ''}
          <span className="duration">{this.formatDuration(duration)}</span>
        </p>
      </li>
    )
  }
}