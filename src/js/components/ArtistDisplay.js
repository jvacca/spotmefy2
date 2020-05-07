import React, { Component } from "react";
import Model from '../model';

export default class ArtistDisplay extends Component {
  constructor() {
    super();

    this.model = new Model();
    this.state = {
      data: null
    };

  }

  componentDidMount() {
    //let { match: { params } } = this.props;
    console.log('***************' + this.props.match.params.artist_id)
    let id = this.props.match.params.artist_id;
    let callPromise = this.model.fetch('artist', id, (data) => {
      console.log('data: ', data);
      this.setState({
        data: data
      });
    });
  }

  render() {
    if (this.state.data !== null) { 
      let backgd = {
        backgroundImage: 'url(' + this.state.data.images[0].url + ')'
      }

      return (
        <div className="artist-panel" style={backgd}>
          <div className="heading">
            <p>Artist</p>
            <h1>{this.state.data.name}</h1>
            
          </div>
        </div>
      );
      } else {
        return <div></div>
      }
  }
}