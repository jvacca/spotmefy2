import React, { Component } from "react";
import Controls from './Controls';
import Model from '../model';

const NowPlaying = ({albumImagePath, song_title, artist_name}) => {
  
  return (
    <div className="now-playing-container">
      <div className="image"><img src={albumImagePath} /></div>
      <div className="copy">
        <p className="hilight">{song_title}</p>
        <p className="artist">{artist_name}</p>
      </div>
    </div>
  )
}

export default class MediaPlayer extends Component {
  constructor(props) {
    super(props);
    this.model = new Model();
  }

  render() {
    if (this.props.currentTrack !== null) {
      console.log('*********', this.props.currentTrack.songPath)
      return (
        <div className="media-player">
          <NowPlaying 
            albumImagePath={this.props.currentTrack.album_images} 
            song_title={this.props.currentTrack.trackName}
            artist_name={this.props.currentTrack.artists}
          />

          <Controls 
            duration={this.props.currentTrack.duration}
            songPath = {this.props.currentTrack.songPath}
            onRepeat = {this.onRepeat}
          />
        </div>
      );
      } else {
        return <div></div>
      }
  }
}