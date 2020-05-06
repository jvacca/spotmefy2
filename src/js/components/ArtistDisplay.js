import React, { Component } from "react";

export default class ArtistDisplay extends Component {
  constructor() {
    super();

    this.state = {
      value: ""
    };

  }

  render() {
    let backgd = {
      backgroundImage: 'url(' + this.props.artistData.images[0].url + ')'
    }
    return (
      <div className="artist-panel" style={backgd}>
        <div className="heading">
          <p>Artist</p>
          <h1>{this.props.artistData.name}</h1>
          
        </div>
      </div>
    );
  }
}