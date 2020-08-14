import React, { Component } from "react";
import PropTypes from 'prop-types';
import Controls from './Controls';
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

const MediaPlayerComponent = ({currentTrack}) => {
      return (
        ((currentTrack !== null || typeof currentTrack !== 'undefined' || currentTrack !== ''))?
        <div className="media-player">
          <NowPlaying 
            albumImagePath={currentTrack.album_images || null} 
            song_title={currentTrack.trackName || ''}
            artist_name={currentTrack.artists || ''}
          />

          <Controls 
            duration={currentTrack.duration || 0}
            songPath = {currentTrack.songPath || ''}
          />
        </div> : <div></div>
      );
}

MediaPlayerComponent.propTypes = {
  currentTrack: PropTypes.object
}

const MediaPlayer = connect(mapStateToProps, null)(MediaPlayerComponent);
export default MediaPlayer;