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
      panel: null,
      id: -1
    }
  }

  updateCurrentData(event) {
    //console.log("event ", event.panel, event.id)
    this.setState({
      panel: event.panel,
      id: event.id
    })
  }

  route() {
    switch(this.state.panel) {
      case 'playlist':
        return <Playlist id={this.state.id} />
      case 'artist':
        return <ArtistDisplay id={this.state.id} />
      case 'album':
        return <AlbumTracksView id={this.state.id} />
      default:
        return <Heading />
    }
  }

  componentDidMount() {
    this.model.pubsub.on('tracks', this.updateCurrentData, this);
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
        <MediaPlayer />
      </div>
    );
  }
}
