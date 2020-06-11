import React, { Component } from "react";
import Heading from './Heading';
import Sidebar from './Sidebar';
import Playlist from './Playlist';
import ArtistDisplay from './ArtistDisplay';
import AlbumTracksView from './AlbumTracksView';
import MediaPlayer from './MediaPlayer';
import Model from '../model';

export default class MainPanel extends Component {
  constructor(props) {
    super(props);

    this.model = new Model();
    this.state={
      currentTrack: null,
      currentTrackIndex: -1,
      panel: null,
      queue: [],
      id: -1
    }

    this.onNextTrack = this.onNextTrack.bind(this);
    this.onPrevTrack = this.onPrevTrack.bind(this);
  }

  updateCurrentPanel(event) {
    //console.log("event ", event.panel, event.id)
    if (this.state.panel !== event.panel || this.state.id !== event.id) {
      this.setState({
        currentTrackIndex: -1
      });
    }

    this.setState({
      panel: event.panel,
      id: event.id
    })
  }

  getImages(album_images) {
    if (album_images.length > 0) {
      if (album_images.length > 2) 
        return album_images[2].url;
      else
        return album_images[0].url
    } else {
      return null;
    }
  }

  getArtistNames(artists) {
    let artistArr = artists.map((artist, index) => ( artist.name ));
    return artistArr.join(', ');
  }

  onPlayTrack(event) {
    //console.log(event.track)
    this.setState({
      currentTrack: {
        albumImage: this.getImages(event.track.album_images),
        songTitle: event.track.trackName,
        artistName: this.getArtistNames(event.track.artists),
        songPath: event.track.songPath,
        songDuration: event.track.songDuration
      },
      currentTrackIndex: event.track.trackIndex
    })
  }

  onPlayPlaylist(event) {
    console.log("updating queue with: ", event.data);

    let queue = event.data.map((item, index) => ({
      album_images: item.track.album.images,
      trackName: item.track.name,
      artists: item.track.artists,
      songPath: item.track.preview_url,
      songDuration: item.track.duration_ms,
      trackIndex: index
    }));

    this.setState({
      queue: queue,
      currentTrackIndex: 0
    })

    let eventData = {
      track: queue[0]
    }

    this.onPlayTrack(eventData)
  }

  onPlayAlbum(event) {
    console.log("updating queue with: ", event.data);

    let album_images = event.album_images

    let queue = event.data.map((item, index) => ({
      album_images: album_images,
      trackName: item.name,
      artists: item.artists,
      songPath: item.preview_url,
      songDuration: item.duration_ms,
      trackIndex: index
    }));

    this.setState({
      queue: queue,
      currentTrackIndex: 0
    })

    let eventData = {
      track: queue[0]
    }

    this.onPlayTrack(eventData)
  }

  updateLikes(event) {

  }

  onPrevTrack(event) {
    if (this.state.currentTrackIndex > 0) {
      let newIndex = this.state.currentTrackIndex - 1
      this.setState({
        currentTrackIndex: newIndex
      })

      let eventData = {
        track: this.state.queue[newIndex]
      }

      this.onPlayTrack(eventData);
    }
  }

  onNextTrack(event) {
    if (this.state.currentTrackIndex < this.state.queue.length) {
      let newIndex = this.state.currentTrackIndex + 1
      this.setState({
        currentTrackIndex: newIndex
      })

      let eventData = {
        track: this.state.queue[newIndex]
      }

      this.onPlayTrack(eventData);
    }
  }

  route() {
    //console.log("routing ", this.state.currentTrackIndex)

    switch(this.state.panel) {
      case 'playlist':
        return <Playlist id={this.state.id} currentTrackIndex={this.state.currentTrackIndex} />
      case 'artist':
        return <ArtistDisplay id={this.state.id} />
      case 'album':
        return <AlbumTracksView id={this.state.id} currentTrackIndex={this.state.currentTrackIndex} />
      default:
        return <Heading />
    }
  }

  componentDidMount() {
    this.model.pubsub.on('selectAlbum', this.updateCurrentPanel, this);
    this.model.pubsub.on('selectArtist', this.updateCurrentPanel, this);
    this.model.pubsub.on('selectPlaylist', this.updateCurrentPanel, this);
    this.model.pubsub.on('playTrack', this.onPlayTrack, this);
    this.model.pubsub.on('playAlbum', this.onPlayAlbum, this);
    this.model.pubsub.on('playPlaylist', this.onPlayPlaylist, this);
    this.model.pubsub.on('likeSong', this.updateLikes, this);
    this.model.pubsub.on('likeAlbum', this.updateLikes, this);
    this.model.pubsub.on('nextSong', this.onNextTrack, this);
    this.model.pubsub.on('prevSong', this.onPrevTrack, this);
  }

  componentDidUpdate() {
    //console.log("Updating ", this.state.currentTrackIndex)
  }

  render() {
    return (
      <div className="app-container">
        <div id="frame" className="frame">
          <Sidebar />
          <div className="main-panel">
            { this.route(this.state.panel) }
          </div>
        </div>
        <MediaPlayer currentTrack={this.state.currentTrack} />
      </div>
    );
  }
}
