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
    return (Math.floor((ms/1000)/60) + ':' + Math.floor((ms/1000)%60));
  }

  select(track, count) {
    let {index, trackName, trackData, artistName, albumName, duration, artist_id, album_id, album_image, songPath, active, onSelect} = this.props;
    let eventData={
      albumImage: album_image,
      songTitle: trackName,
      artistName: artistName,
      songPath: track.preview_url,
      songDuration: duration
    }

    this.model.pubsub.emit('play', eventData);
    onSelect(count);
  }

  componentDidMount() {

  }

  componentDidUpdate() {
    //console.log("updated", this.props.index)
  }

  render() {
    let {index, trackName, trackData, artistName, albumName, duration, artist_id, active, album_id} = this.props;
    let artist_link = "/artist/" + artist_id;
    let album_link = "/album/" + album_id;
    return (
      <li className={(active === true)? 'active': ''}>
        <p>
          <span className="index">{index + 1}</span> 
          <span onClick={(e) => this.select(trackData, index)} className="song-name">{trackName}</span>
          <span className="artist-name"><Link to={artist_link}>{artistName}</Link></span>
          <span className="album-name"><Link to={album_link}>{albumName}</Link></span>
          <span className="duration">{this.formatDuration(duration)}</span>
        </p>
      </li>
    )
  }
}