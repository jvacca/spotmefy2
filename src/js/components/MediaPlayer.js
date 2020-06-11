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

  onRepeat() {
    console.log("repeat now");
  }

  render() {
    if (this.props.currentTrack !== null) {
      
      return (
        <div className="media-player">
          <NowPlaying 
            albumImagePath={this.props.currentTrack.albumImage} 
            song_title={this.props.currentTrack.songTitle}
            artist_name={this.props.currentTrack.artistName}
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