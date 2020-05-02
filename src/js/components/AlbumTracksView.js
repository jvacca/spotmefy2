import React, { Component } from "react";

class AlbumTracksView extends Component {
  constructor() {
    super();

    this.state = {
      value: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { value } = event.target;
    this.setState(() => {
      return {
        value
      };
    });
  }

  

  render() {

    let tracks = this.props.albumData.tracks.items.map( (item) => {
        return (
          <li>
            <p>{item.name} {item.duration_ms}</p>
          </li>
        )
      
    });

    return (
      <div>
        <h1>{this.props.albumData.name}</h1>
        <p>{this.props.albumData.artists[0].name}</p>
        <img src={this.props.albumData.images[1].url} />

        <ul>
          {tracks}
        </ul>
      </div>
    );
  }
}

export default AlbumTracksView;