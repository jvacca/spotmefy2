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
    this.state = {
      index: 0,
      queue: [],
      currentData: {
        albumImage: "",
        songTitle: "",
        artistName: "",
        songPath: "",
        songDuration: "0"
      }
    };
  }

  updateCurrentData(event) {
    this.setState({
      currentData: {
        albumImage: event.albumImage,
        songTitle: event.songTitle,
        artistName: event.artistName,
        songPath: event.songPath,
        songDuration: event.songDuration
      }
    })
  }

  componentDidMount() {
    this.model.pubsub.on('play', this.updateCurrentData, this);
  }

  componentWillUnmount() {
    this.model.pubsub.off('play');
  }

  onNextSong() {
    console.log("next track");
  }

  onPrevSong() {
    console.log("previous track");
  }

  onShuffle() {
    console.log("shuffle now");
  }

  onRepeat() {
    console.log("repeat now");
  }

  render() {
    if (this.state.currentData !== null) {
      
      return (
        <div className="media-player">
          <NowPlaying 
            albumImagePath={this.state.currentData.albumImage} 
            song_title={this.state.currentData.songTitle}
            artist_name={this.state.currentData.artistName}
          />

          <Controls 
            duration={0}
            songPath = {this.state.currentData.songPath}
            onNext = {this.onNextSong}
            onPrev = {this.onPrevSong}
            onShuffle = {this.onShuffle}
            onRepeat = {this.onRepeat}
          />
        </div>
      );
      } else {
        return <div></div>
      }
  }
}