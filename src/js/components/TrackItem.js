import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Model from '../model';

export default class TrackItem extends Component {
  constructor(props) {
    super(props);

    this.model = new Model();
    this.state = {
      active: false
    }

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

  componentDidMount() {

  }

  componentDidUpdate() {
    //console.log("updated", this.props.index)
  }

  getArtistLinks(artists) {    
    return artists.map((artist, index) => (
      <Link key={index} to={`/artist/${artist.id}`}>{artist.name}{(index < artists.length-1)? ', ' : ''}</Link>
    ));
  }

  getArtistName(artists) {
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
      artistName: this.getArtistName(artists),
      songPath: track.preview_url,
      songDuration: duration
    }

    this.model.pubsub.emit('play', eventData);
    onSelect(count);
  }

  render() {
    let {index, trackName, trackData, artists, albumName, duration, active, album_id} = this.props;
    let album_link = "/album/" + album_id;
    return (
      <li className={(active === true)? 'active': ''}>
        <p>
          <span className="index">{index}</span> 
          <span onClick={(e) => this.select(trackData, index)} className="song-name">{trackName}</span>
          {(this.props.isAlbumView === false)? <span className="artist-name">{this.getArtistLinks(artists)}</span> : ''}
          <span className="album-name"><Link to={album_link}>{albumName}</Link></span>
          <span className="duration">{this.formatDuration(duration)}</span>
        </p>
      </li>
    )
  }
}