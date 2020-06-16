import React, {Component} from 'react';
import Model from '../model';

export default class Controls extends Component {
  constructor(props) {
    super(props);

    this.model = new Model();
    this.state = {
      playState: false,
      shuffleState: false,
      repeatState: false,
      progress: null,
      volume: null
    };

    this.shuffle = this.shuffle.bind(this);
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
    this.playPause = this.playPause.bind(this);
    this.repeat = this.repeat.bind(this);

    this.soundObj = React.createRef();
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

  shuffle(e) {
    this.setState({
      shuffleState: !this.state.shuffleState
    });

    this.model.pubsub.emit('shuffle');
  }

  previous(e) {
    this.model.pubsub.emit('prevSong');
  }

  next(e) {
    this.model.pubsub.emit('nextSong');
  }

  playPause(e) {
    this.setState({
      playState: !this.state.playState
    }, () => {
      if (this.state.playState === true) {
        this.soundObj.current.load();
        this.soundObj.current.play();
      } else { 
        this.soundObj.current.pause();
      }
    });
  }

  repeat(e) {
    this.setState({
      repeatState: !this.state.repeatState
    })

    this.props.onRepeat(this.state.repeatState);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.songPath !== this.props.songPath) {
      this.playPause();
    }
  }

  render() {
    
    return (
      <div className="controls-container">
        <div className="control-panel">
          <div className="controls">
            <button id="shuffle" onClick={this.shuffle}><img src="assets/images/btn_shuffle.png" /></button>
            <button id="prev" onClick={this.previous}><img src="assets/images/btn_prev.png" /></button>
            <button id="play-pause" onClick={this.playPause}><img src="assets/images/btn_play.png" /></button>
            <button id="next" onClick={this.next}><img src="assets/images/btn_next.png" /></button>
            <button id="repeat" onClick={this.repeat}><img src="assets/images/btn_repeat.png" /></button>
          </div>

          <div className="progressbar-container">
            <p id="currentTime">00:00</p>
            <div id="progressbar">
              <div id="bar"></div>
            </div>
            <p id="duration">{this.formatDuration(this.props.duration)}</p>
          </div>
        </div>

        <div className="volume-panel">
          <button id="volume"></button>
          <div className="volume-container">
            <button id="mute"><img src="assets/images/icon_volume.png" /></button>
            <div className="volumebar">
              <div className="bar"></div>
            </div>
          </div>
        </div>

        <audio id="audio" src={this.props.songPath} ref={this.soundObj}>
          This is not supported
        </audio>
      </div>
    )
  }
}