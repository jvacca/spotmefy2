import React, { Component } from "react";

export default class AlbumTracksView extends Component {
  constructor() {
    super();

    this.state = {
      value: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { value } = event.target;
    this.setState(() => {
      return {
        value
      };
    });
  }

  formatDuration(ms) {
    return (Math.floor((ms/1000)/60) + ':' + Math.floor((ms/1000)%60));
  }

  render() {
    let tracks = this.props.albumData.tracks.items.map( (item, index) => {
        return (
          <li key={index}>
            <p>
              <span className="index">{index + 1}</span> 
              <span className="song-name">{item.name}</span> 
              <span className="duration">{this.formatDuration(item.duration_ms)}</span>
            </p>
          </li>
        )
      
    });

    return (
      <div className="album-panel">
        <div className="album-cover"><img src={this.props.albumData.images[1].url} /></div>
        <div className="heading">
          <p>ALBUM</p>
          <h1>{this.props.albumData.name}</h1>
          <p>By <span className="hilight">{this.props.albumData.artists[0].name}</span></p>
          <p>{this.props.albumData.release_date} . {this.props.albumData.total_tracks} songs, {"47 min"}</p>
        </div>
        
        <ol>
          <li className="header">
            <p>
              <span className="index">#</span> 
              <span className="song-name">TITLE</span> 
              <span className="duration">DURATION</span>
            </p>
          </li>
          {tracks}
        </ol>
      </div>
    );
  }
}