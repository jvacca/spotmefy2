import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as Actions from '../actions';

const mapDispatchToProps = dispatch => ({
  prevTrack: (data) => dispatch(Actions.prevTrack()),
  nextTrack: (data) => dispatch(Actions.nextTrack()),
});

class ControlsComponent extends Component {
  constructor(props) {
    super(props);

    this.soundObj = React.createRef();
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
  }

  previous(e) {
    this.props.prevTrack();
  }

  next(e) {
    this.props.nextTrack();
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
            <button id="prev" onClick={this.previous}> &#x25C0; </button>
            <audio id="audio" controls src={this.props.songPath} ref={this.soundObj}>
              This is not supported
            </audio>
            <button id="next" onClick={this.next}> &nbsp;&#x25B6; </button>
          </div>
        </div>
      </div>
    )
  }
}

ControlsComponent.propTypes = {
  prevTrack: PropTypes.func,
  nextTrack: PropTypes.func,
  songPath: PropTypes.string,
  duration: PropTypes.number
}

const Controls = connect(null, mapDispatchToProps)(ControlsComponent);

export default Controls