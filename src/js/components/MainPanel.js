import React, { Component } from "react";
import ArtistDisplay from './ArtistDisplay';
import AlbumTracksView from './AlbumTracksView';

export default class MainPanel extends Component {
  constructor() {
    super();

    this.state = {
      currentViewState: ""
    };
  }

  render() {
    return (<div>{
      (this.props.viewState === 'albums-view')? <AlbumTracksView albumData={this.props.data} /> : <ArtistDisplay artistData={this.props.data} />
    }</div>);
  }
}