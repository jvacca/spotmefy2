import React, { Component } from "react";
import Heading from './Heading';
import Sidebar from './Sidebar';
import PlaylistPanel from './PlaylistPanel';
import ArtistPanel from './ArtistPanel';
import AlbumPanel from './AlbumPanel';
import SavedAlbumsPanel from './SavedAlbumsPanel';
import SavedTracksPanel from './SavedTracksPanel';
import Search from './Search';
import MediaPlayer from './MediaPlayer';
import Model from '../model';

export default class MainPanel extends Component {
  constructor(props) {
    super(props);
    
    this.model = new Model();
    this.state = {
      searchString: '',
      query: '',
      currentTrack: null,
      currentTrackIndex: -1,
      currentTrackid: -1,
      queue: null
    }
    this.onSearch = this.onSearch.bind(this);
    this.onNextTrack = this.onNextTrack.bind(this);
    this.onPrevTrack = this.onPrevTrack.bind(this);
  }

  getPanel() {
    let count, panel;
    if (this.props.match.path.lastIndexOf('/') > 0) {
      count = this.props.match.path.lastIndexOf('/')
      panel = this.props.match.path.substr(1, count).replace('/', '')
    } else {
      panel = this.props.match.path.substr(1, this.props.match.path.length-1)
    }

    return panel;
  }
/*
  updateCurrentPanel(event) {
    //console.log("event ", event.panel, event.id)
    if (this.state.panel !== event.panel || this.state.id !== event.id) {
      let index = (event.track_index)? event.track_index : -1
      this.setState({
        currentTrackIndex: index
      });
    }

    this.setState({
      panel: event.panel,
      id: event.id || -1,
      currentTrackid: event.track_id || -1
    })
  }*/

  sanitizeTracks(which, tracks, album_images) {
    if (which === 'album') {
      return tracks.map((item, index) => ({
          album_images: this.model.getImages(album_images),
          trackName: item.name,
          artists: this.model.getArtistNames(item.artists),
          songPath: item.preview_url,
          duration: item.duration_ms
        }));
    } else {
      return tracks.map((item, index) => ({
        album_images: this.model.getImages(item.track.album.images),
        trackName: item.track.name,
        artists: this.model.getArtistNames(item.track.artists),
        songPath: item.track.preview_url,
        duration: item.track.duration_ms
      }));
    }

  }

  onPlayPlaylist(event) {
    //console.log("updating queue with: ", event.data);

    let tracks = this.sanitizeTracks('playlist', event.tracks);
    let queue = {
      id: event.id,
      tracks: tracks
    }

    this.setState({
      queue: queue,
      currentTrack: queue.tracks[0],
      currentTrackIndex: 0
    })
  }

  onPlayAlbum(event) {
    //console.log("updating queue with: ", event.data);

    let tracks = this.sanitizeTracks('album', event.tracks, event.album_images);
    let queue = {
      id: event.id,
      tracks: tracks
    }

    this.setState({
      queue: queue,
      currentTrack: queue.tracks[0],
      currentTrackIndex: 0
    })
  }

  onPlaySingleTrack(event) {
    if (!this.state.queue || (this.state.queue && this.state.queue.id !== event.id)) {
      let tracks = this.sanitizeTracks(event.panel, event.tracks, (typeof event.album_images !== 'undefined')? event.album_images : null);
      
      let queue = {
        id: event.id,
        tracks: tracks,
      }
      this.setState({
        queue: queue,
        currentTrack: queue.tracks[event.index],
        currentTrackIndex: event.index
      })
    } else {
      this.setState({
        currentTrack: this.state.queue.tracks[event.index],
        currentTrackIndex: event.index
      })
    }
  }

  onPrevTrack(event) {
    if (!this.state.queue) return;
    if (this.state.queue.tracks.length > 1 && this.state.currentTrackIndex > 0) {
      let newIndex = this.state.currentTrackIndex - 1
      this.setState({
        currentTrack: this.state.queue.tracks[newIndex],
        currentTrackIndex: newIndex
      })
    }
  }

  onNextTrack(event) {
    if (!this.state.queue) return;
    if (this.state.queue.tracks.length > 1 && this.state.currentTrackIndex < this.state.queue.tracks.length-1) {
      let newIndex = this.state.currentTrackIndex + 1
      this.setState({
        currentTrack: this.state.queue.tracks[newIndex],
        currentTrackIndex: newIndex
      })
    }
  }

  route() {
    let panel = this.getPanel();

    switch(panel) {
      case 'playlist':
        return <PlaylistPanel id={this.props.match.params.id} currentTrackIndex={this.state.currentTrackIndex} />
      case 'artist':
        return <ArtistPanel id={this.props.match.params.id} />
      case 'album':
        return <AlbumPanel id={this.props.match.params.id} track={this.state.currentTrackid} currentTrackIndex={this.state.currentTrackIndex} />
      case 'savedalbums':
        return <SavedAlbumsPanel />
      case 'savedtracks':
        return <SavedTracksPanel currentTrackIndex={this.state.currentTrackIndex} />
      case 'search':
        return <Search query={this.state.query} />
      case 'recentlyPlayed':
        // create recently played first
        return;
      default:
        return <Heading />
    }
  }

  componentDidMount() {
    //console.log("Mounted ", this.props.match.params, this.props.match.path);

    this.model.pubsub.on('playTrack', this.onPlaySingleTrack, this);
    this.model.pubsub.on('playAlbum', this.onPlayAlbum, this);
    this.model.pubsub.on('playPlaylist', this.onPlayPlaylist, this);
    this.model.pubsub.on('playSavedTracks', this.onPlayPlaylist, this);
    this.model.pubsub.on('nextSong', this.onNextTrack, this);
    this.model.pubsub.on('prevSong', this.onPrevTrack, this);
  }

  componentDidUpdate() {
    //console.log("Updated ", this.props.match.params, this.props.match.path)
  }

  componentWillUnmount() {
    this.model.pubsub.removeAllListeners();
  }

  onSearch(e) {
    this.setState({
      panel: 'search',
      id: -1,
      query: e.target.value,
      currentTrackIndex: -1,
      searchString: e.target.value
    })
  }

  render() {
    return (
      <div className="app-container">
        <div id="frame" className="frame">
          <Sidebar />
          <div className="main-panel">
          <div className="search">Search:&nbsp; <input type="text" id="search_string" onChange={this.onSearch} value={this.state.searchString} placeholder="Search"></input></div>
            { this.route() }
          </div>
        </div>
        <MediaPlayer currentTrack={this.state.currentTrack} />
      </div>
    );
  }
}
