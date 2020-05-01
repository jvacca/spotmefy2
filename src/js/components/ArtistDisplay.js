import React, { Component } from "react";

class ArtistDisplay extends Component {
  constructor() {
    super();

    this.state = {
      value: ""
    };

  }

  render() {
    return (
      <div>
        <h1>Artist</h1>
        <p>{this.props.name}</p>
        <img src={this.props.image} />
      </div>
    );
  }
}

export default ArtistDisplay;