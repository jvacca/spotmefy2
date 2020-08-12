import React, { Component } from "react";
import {connect} from 'react-redux';
import * as Actions from '../actions'
import {Link} from 'react-router-dom';
import TrackItem from './TrackItem';
import * as Utils from '../utils';

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

const mapStateToProps = state => ({
  albumData: state.fetchedData['artistAlbums'],
  artistData: state.fetchedData['artist'],
  artistTopTracks: state.fetchedData['artistTopTracks']
});

const mapDispatchToProps = dispatch => ({
  playSingleTrack: (data) => dispatch(Actions.playSingleTrack(data)),
  load: (which, id) => dispatch(Actions.fetchData(which, id))
});

class ArtistPanelComponent extends Component {
  constructor(props) {
    super(props);

    this.onPlayTrack = this.onPlayTrack.bind(this);
  }

  filterAlbums(albums) {   
      let filter = albums.items.filter(album => ( 
        album.name.includes('(Deluxe') === false &&
        album.name.includes('(Expand') === false &&
        album.name.includes('Remaster') === false
      ));
      let filteredState = {}
      filteredState.items = filter;

      return filteredState;
  }

  componentDidMount() {
    let callPromise = this.props.load('artist',this.props.match.params.id);
    let callPromise2 = this.props.load('artistTopTracks',this.props.match.params.id);
    let callPromise3 = this.props.load('artistAlbums',this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      let callPromise = this.props.load('artist',this.props.match.params.id);
      let callPromise2 = this.props.load('artistTopTracks',this.props.match.params.id);
      let callPromise3 = this.props.load('artistAlbums',this.props.match.params.id);
    }
  }

  onPlayTrack(index) {
    let eventData={
      panel: 'album',
      tracks: this.props.artistTopTracks.tracks,
      album_images: this.props.artistData.images,
      index: index
    }

    this.props.playSingleTrack(eventData);
  }

  render() {
    if (this.props.albumData && this.props.artistData && this.props.artistTopTracks) { 
      let {images, name} = this.props.artistData;
      let albums = this.filterAlbums(this.props.albumData)
      return (
        <div className="artist-panel">
          <div className="heading-holder">
            <div className="artist-image"><img src={Utils.getImages(images)} /></div>
            <div className="heading">
              <p className="heading-label">ARTIST</p>
              <h1>{name}</h1>
              <h3>Popular</h3>
              <div className="top-tracks-holder">
                {
                  this.props.artistTopTracks && <SimpleTrackList2
                  tracks = {this.props.artistTopTracks}
                  images = {images}
                  onPlayTrack = {this.onPlayTrack}
                />}
              </div>
            </div>
          </div>
          <h3>Albums</h3>
          <ul>
            {
              albums.items.map( (item, index) => {
                return (
                  <li key={index}>
                    <Link to={`/album/${item.id}`}>
                      <img src={Utils.getImages(item.images)} />
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

const ArtistPanel = connect(mapStateToProps, mapDispatchToProps)(ArtistPanelComponent);

export default ArtistPanel