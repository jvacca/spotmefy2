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

  updateCurrentTrack(event) {
    this.setState({
      currentTrack: {
        albumImage: event.albumImage,
        songTitle: event.songTitle,
        artistName: event.artistName,
        songPath: event.songPath,
        songDuration: event.songDuration
      },
      currentTrackIndex: event.trackIndex
    })
  }

  route() {
    console.log("routing ", this.state.currentTrackIndex)

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
    this.model.pubsub.on('selectTrack', this.updateCurrentTrack, this);
  }

  componentDidUpdate() {
    console.log("Updating ", this.state.currentTrackIndex)
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
