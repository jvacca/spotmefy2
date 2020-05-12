import React, { Component } from "react";
import Model from '../model';

export default class AlbumTracksView extends Component {
  constructor() {
    super();

    this.model = new Model();
    this.state = {
      data: null
    };
  }

  componentDidMount() {
    let id = this.props.match.params.album_id;
    let callPromise = this.model.load('albumTracks', id, (data) => {
      console.log('data: ', data);
      this.setState({
        data: data
      });
    });
  }

  formatDuration(ms) {
    return (Math.floor((ms/1000)/60) + ':' + Math.floor((ms/1000)%60));
  }

  select(item) {
    let eventData={
      albumImage: this.state.data.images[2].url,
      songTitle: item.name,
      artistName: item.artists[0].name,
      songPath: item.preview_url,
      songDuration: item.duration_ms
    }

    this.model.pubsub.emit('play', eventData)
  }

  render() {
    if (this.state.data !== null) { 
      let {images, name, artists, release_date, total_tracks} = this.state.data
      return (
        <div className="album-panel">
          <div className="album-cover"><img src={images[1].url} /></div>
          <div className="heading">
            <p>ALBUM</p>
            <h1>{name}</h1>
            <p>By <span className="hilight">{artists[0].name}</span></p>
            <p>{release_date} . {total_tracks} songs</p>
          </div>
          
          <ol>
            <li className="header">
              <p>
                <span className="index">#</span> 
                <span className="song-name">TITLE</span> 
                <span className="duration">DURATION</span>
              </p>
            </li>
            {
              this.state.data.tracks.items.map( (item, index) => {
                return (
                  <li key={index}>
                    <p>
                      <span className="index">{index + 1}</span> 
                      <span onClick={(e) => this.select(item)} className="song-name">{item.name}</span> 
                      <span className="duration">{this.formatDuration(item.duration_ms)}</span>
                    </p>
                  </li>
                )
              })
            }
          </ol>
        </div>
      );
      } else {
        return <div></div>
      }
  }
}