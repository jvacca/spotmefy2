import React, {Component} from 'react';
import Model from '../model';

export default class Controls extends Component {
  constructor(props) {
    super(props);

    this.model = new Model();
    this.soundObj = React.createRef();
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
  }

  previous(e) {
    this.model.pubsub.emit('prevSong');
  }

  next(e) {
    this.model.pubsub.emit('nextSong');
  }

  componentDidMount() {
    //this.soundObj
  }

  componentDidUpdate(prevProps) {
    if (prevProps.songPath !== this.props.songPath) {
      this.soundObj.current.pause();
    }
  }

  render() {
    
    return (
      <div className="controls-container">
        <div className="control-panel">
          <div className="controls">
            <button id="prev" onClick={this.previous}> &lt; </button>
            <audio id="audio" controls src={this.props.songPath} ref={this.soundObj}>
              This is not supported
            </audio>
            <button id="next" onClick={this.next}> &gt; </button>
          </div>
        </div>
      </div>
    )
  }
}