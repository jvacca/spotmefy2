import React, { Component } from "react";
import Controls from './Controls';
import Model from '../model';
import {connect} from 'react-redux';

const mapStateToProps = state => ({
  currentTrack: state.queue.currentTrack
});

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

class MediaPlayerComponent extends Component {
  constructor(props) {
    super(props);
    this.model = new Model();
  }

  render() {
    if (this.props.currentTrack !== null || typeof this.props.currentTrack !== 'undefined' || this.props.currentTrack !== '') {
      //console.log('*********?', this.props.currentTrack)
      return (
        <div className="media-player">
          <NowPlaying 
            albumImagePath={this.props.currentTrack.album_images || null} 
            song_title={this.props.currentTrack.trackName || ''}
            artist_name={this.props.currentTrack.artists || ''}
          />

          <Controls 
            duration={this.props.currentTrack.duration || 0}
            songPath = {this.props.currentTrack.songPath || ''}
          />
        </div>
      );
    } else {
      return <div></div>
    }
  }
}

const MediaPlayer = connect(mapStateToProps, null)(MediaPlayerComponent);
export default MediaPlayer;