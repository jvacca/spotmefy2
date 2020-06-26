import React, { Component } from "react";
import {Link} from 'react-router-dom';
import TrackItem from './TrackItem';
import Model from '../model';

const SimpleTrackList2 = ({tracks, images, onPlayTrack}) => {
  let filtered_tracks = tracks.tracks.slice(0, 5)
  return (
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
        filtered_tracks.map( (item, index) => {
          //let isActive = (currentTrackIndex === index)

          return (
            <TrackItem
              key={index}
              index={index + 1}
              trackName={item.name}
              trackData={item}
              artists={''}
              albumName={''}
              duration={item.duration_ms}
              album_id={''}
              album_images={images}
              songPath={item.preview_url}
              active={false}
              isAlbumView={true}
              onPlayTrack = {onPlayTrack}
            />
          )
        })
      }
    </ol>
  )
}

export default class ArtistPanel extends Component {
  constructor(props) {
    super(props);

    this.model = new Model();
    this.state = {
      albumData: null,
      artistData: null,
      artistTopTracks: null
    };
    this.onPlayTrack = this.onPlayTrack.bind(this);
  }

  loadArtist(id) {
    let callPromise = this.model.load('artist', id, (data) => {
      //console.log('data: ', data);
      this.setState({
        artistData: data
      });
    })
  }

  loadArtistTracks(id) {
    let callPromise = this.model.load('artistTopTracks', id, (data) => {
      //console.log('data: ', data);
      this.setState({
        artistTopTracks: data
      });
    })
  }

  loadAlbum(id) {
    let callPromise = this.model.load('artistAlbums', id, (data) => {
      //console.log('data: ', data);
      
      let filter = data.items.filter(album => ( 
        album.name.includes('(Deluxe') === false &&
        album.name.includes('(Expand') === false &&
        album.name.includes('Remaster') === false
      ))
      let filteredState = {}
      filteredState.items = filter;

      this.setState({
        albumData: filteredState
      });
    })
  }

  componentDidMount() {
    this.loadArtist(this.props.id);
    this.loadArtistTracks(this.props.id);
    this.loadAlbum(this.props.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.loadArtist(this.props.id);
      this.loadArtistTracks(this.props.id);
      this.loadAlbum(this.props.id);
    }
  }

  onPlayTrack(index) {
    let eventData={
      panel: 'album',
      tracks: this.state.artistTopTracks.tracks,
      album_images: this.state.artistData.images,
      index: index
    }
    this.model.pubsub.emit('playTrack', eventData);
  }

  render() {
    if (this.state.albumData && this.state.artistData && this.state.artistTopTracks) { 
      let {images, name} = this.state.artistData
      return (
        <div className="artist-panel">
          <div className="heading-holder">
            <div className="artist-image"><img src={this.model.getImages(images)} /></div>
            <div className="heading">
              <p className="heading-label">ARTIST</p>
              <h1>{name}</h1>
              <h3>Popular</h3>
              <div className="top-tracks-holder">
                {
                  this.state.artistTopTracks && <SimpleTrackList2
                  tracks = {this.state.artistTopTracks}
                  images = {images}
                  onPlayTrack = {this.onPlayTrack}
                />}
              </div>
            </div>
          </div>
          
          <ul>
            {
              this.state.albumData.items.map( (item, index) => {
                return (
                  <li key={index}>
                    <Link to={`/album/${item.id}`}>
                      <img src={this.model.getImages(item.images)} />
                      <p className="hilight">{item.name}</p> 
                      <p>{item.release_date}</p>
                    </Link>
                  </li>
                )
              })
            }
          </ul>
        </div>
      );
      } else {
        return <div></div>
      }
  }
}