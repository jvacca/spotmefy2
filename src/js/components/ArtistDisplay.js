import React, { Component } from "react";
import {Link} from 'react-router-dom';
import Model from '../model';

export default class ArtistDisplay extends Component {
  constructor() {
    super();

    this.model = new Model();
    this.state = {
      albumData: null,
      artistData: null
    };

  }

  componentDidMount() {
    let id = this.props.match.params.artist_id;
    let callPromise = this.model.load('artist', id, (data) => {
      //console.log('data: ', data);
      this.setState({
        artistData: data
      });
    })

    let callPromise2 = this.model.load('artistAlbums', id, (data) => {
      //console.log('data: ', data);
      this.setState({
        albumData: data
      });
    });
  }

  render() {
    if (this.state.albumData && this.state.artistData) { 
      
      let backgd = {
        backgroundImage: 'url(' + this.state.artistData.images[0].url + ')'
      }

      return (
        <div className="artist-panel">
          <div className="heading" style={backgd}>
            <p>Artist</p>
            <h1>{this.state.albumData.items[0].artists[0].name}</h1>
          </div>
          <ul>
            {
              this.state.albumData.items.map( (item, index) => {
                let album_link = "/album/" + item.id;
                return (
                  <li key={index}>
                    <Link className="albumBox" to={album_link}>
                      <img src={item.images[1].url} />
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