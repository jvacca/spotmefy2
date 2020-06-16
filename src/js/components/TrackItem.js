import React, { Component } from 'react';
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
      <a key={index} href="#" onClick={e => {this.selectArtist(e, artist.id)}}>{artist.name}{(index < artists.length-1)? ', ' : ''}</a>
    ));
  }

  playTrack(count) {
    this.props.onPlayTrack(count)
  }

  selectAlbum(e, id) {
    e.preventDefault();
    //console.log('select album ', id)
    let eventData={
      panel: 'album',
      id: id
    }
    this.model.pubsub.emit('selectAlbum', eventData);
  }

  selectArtist(e, id) {
    e.preventDefault();
    //console.log('select artist ', id)

    let eventData={
      panel: 'artist',
      id: id
    }
    this.model.pubsub.emit('selectArtist', eventData);
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
          {(this.props.isAlbumView === false)? <span className="album-name"><a href="#" onClick={e => {this.selectAlbum(e, album_id)}}>{albumName}</a></span> : ''}
          <span className="duration">{this.formatDuration(duration)}</span>
        </p>
      </li>
    )
  }
}