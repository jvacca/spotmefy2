import React, { Component } from "react";
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
    this.loadArtist(this.props.id);
    this.loadAlbum(this.props.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.loadArtist(this.props.id);
      this.loadAlbum(this.props.id);
    }
  }

  getImages(album_images) {
    if (album_images.length > 0) {
      if (album_images.length > 1) 
        return album_images[1].url;
      else
        return album_images[0].url
    } else {
      return null;
    }
  }

  selectAlbum(e, id) {
    e.preventDefault();
    //console.log('select album ', id);

    let eventData={
      panel: 'album',
      id: id
    }
    this.model.pubsub.emit('selectAlbum', eventData);
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
                return (
                  <li key={index}>
                    <a className="albumBox" href="#" onClick={e => {this.selectAlbum(e, item.id)}}>
                      <img src={this.getImages(item.images)} />
                      <p className="hilight">{item.name}</p> 
                      <p>{item.release_date}</p>
                    </a>
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