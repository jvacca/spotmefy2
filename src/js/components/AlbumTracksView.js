import React, { Component } from "react";
import TrackItem from './TrackItem';
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
      //console.log('data: ', data);
      this.setState({
        data: data
      });
    });
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
                <span className="artist-name"></span>
                <span className="album-name"></span>
                <span className="duration">DURATION</span>
              </p>
            </li>
            {
              this.state.data.tracks.items.map( (item, index) => {
                return (
                  <TrackItem
                    key={index}
                    index={index + 1}
                    trackName={item.name}
                    trackData={item}
                    artistName={''}
                    albumName={''}
                    duration={item.duration_ms}
                    artist_id={''}
                    album_id={''}
                    album_image={images[2].url}
                    songPath={item.preview_url}
                  />
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