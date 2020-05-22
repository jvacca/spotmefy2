import React, { Component } from "react";
import {Link} from 'react-router-dom';
import Model from '../model';

export default class ArtistDisplay extends Component {
  constructor(props) {
    super(props);

    this.model = new Model();
    this.state = {
      albumData: null,
      artistData: null
    };

  }

  loadArtist(id) {
    let callPromise = this.model.load('artist', id, (data) => {
      //console.log('data: ', data);
      this.setState({
        artistData: data
      });
    })
  }

  loadAlbum(id) {
    let callPromise = this.model.load('artistAlbums', id, (data) => {
      //console.log('data: ', data);
      
      let filter = data.items.filter(album => ( 
        album.name.includes('(Deluxe') === false &&
        album.name.includes('(Expand') === false &&
        album.name.includes('Remaster') === false
      ))
      let filteredState = {}
      filteredState.items = filter;

      this.setState({
        albumData: filteredState
      });
    })
  }

  componentDidMount() {
    let id = this.props.match.params.artist_id;
    this.loadArtist(id);
    this.loadAlbum(id);
  }

  render() {
    if (this.state.albumData && this.state.artistData) { 
      let {images, name} = this.state.artistData
      return (
        <div className="artist-panel">
          <div className="artist-image"><img src={images[0].url} /></div>
          <div className="heading">
            <p>ARTIST</p>
            <h1>{name}</h1>
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