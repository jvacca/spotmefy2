import React, { Component } from 'react';
import Model from '../model';

export default class TrackItem extends Component {
  constructor(props) {
    super(props);

    this.model = new Model();
    this.select = this.select.bind(this);
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

  getArtistNames(artists) {
    let artistArr = artists.map((artist, index) => ( artist.name ));
    return artistArr.join(', ');
  }

  getImages(album_images) {
    if (album_images.length > 0) {
      if (album_images.length > 2) 
        return album_images[2].url;
      else
        return album_images[0].url
    } else {
      return null;
    }
  }

  select(track, count) {
    let {trackName, artists, duration, album_images, onSelect} = this.props;
    let eventData={
      albumImage: this.getImages(album_images),
      songTitle: trackName,
      artistName: this.getArtistNames(artists),
      songPath: track.preview_url,
      songDuration: duration,
      trackIndex: count-1
    }

    this.model.pubsub.emit('selectTrack', eventData);
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

  onLikeSong(track) {
    console.log("like song ", track)
  }

  render() {
    let {index, trackName, trackData, artists, albumName, duration, active, album_id} = this.props;
    let album_link = "" + album_id;
    return (
      <li className={(active === true)? 'active': ''}>
        <p>
          <span className="index">{index}</span>
          <span onClick={e => this.onLikeSong(trackData)} className="like">&hearts;</span>
          <span onClick={(e) => this.select(trackData, index)} className="song-name">{trackName}</span>
          {(this.props.isAlbumView === false)? <span className="artist-name">{this.getArtistLinks(artists)}</span> : ''}
          <span className="album-name"><a href="#" onClick={e => {this.selectAlbum(e, album_id)}}>{albumName}</a></span>
          <span className="duration">{this.formatDuration(duration)}</span>
        </p>
      </li>
    )
  }
}