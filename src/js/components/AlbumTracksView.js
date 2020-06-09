import React, { Component } from "react";
import TrackItem from './TrackItem';
import Model from '../model';

export default class AlbumTracksView extends Component {
  constructor(props) {
    super(props);

    this.model = new Model();
    this.state = {
      data: null
    };
  }

  loadAlbum(id) {
    let callPromise = this.model.load('albumTracks', id, (data) => {
      //console.log('data: ', data);
      this.setState({
        data: data
      });
    });
  }

  componentDidMount() {
    this.loadAlbum(this.props.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.loadAlbum(this.props.id);
    }
  }

  getImages(album_images) {
    if (album_images.length > 0) {
      if (album_images.length > 1) 
        return album_images[1].url;
      else
        return album_images[0].url
    } else {
      return null;
    }
  }

  onPlay(tracks) {
    let eventData={
      data: tracks.items
    }
    this.model.pubsub.emit('playAlbum', eventData);
  }

  onLikeAlbum() {
    console.log("like album ", this.state.data);
    let eventData={
      data: this.state.data
    }
    this.model.pubsub.emit('likeAlbum', eventData);
  }

  render() {
    if (this.state.data !== null) { 
      let {images, name, artists, tracks, release_date, total_tracks} = this.state.data
      return (
        <div className="album-panel">
          <div className="album-cover"><img src={this.getImages(images)} /></div>
          <div className="heading">
            <p>ALBUM</p>
            <h1>{name}</h1>
            <p>By <span className="hilight">{artists[0].name}</span></p>
            <p>{release_date} . {total_tracks} songs</p>
            <a className="play_button" onClick={e => {this.onPlay(tracks)}}>PLAY</a><a onClick={e => this.onLikeAlbum()} className="likeAlbum">&hearts;</a>
          </div>
          
          <ol>
            <li className="header">
              <p>
                <span className="index">#</span>
                <span className="like"></span>
                <span className="song-name">TITLE</span>
                <span className="artist-name"></span>
                <span className="album-name"></span>
                <span className="duration">DURATION</span>
              </p>
            </li>
            {
              this.state.data.tracks.items.map( (item, index) => {
                let isActive = (index === this.props.currentTrackIndex)? true: false;

                return (
                  <TrackItem
                    key={index}
                    index={index + 1}
                    trackName={item.name}
                    trackData={item}
                    artists={artists}
                    albumName={''}
                    duration={item.duration_ms}
                    artist_id={''}
                    album_id={''}
                    album_images={images}
                    songPath={item.preview_url}
                    active={isActive}
                    onSelect={this.onSelect}
                    isAlbumView={true}
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