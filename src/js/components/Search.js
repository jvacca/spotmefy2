import React, { Component } from "react";
import Model from '../model';

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.model = new Model();
    this.state = {
      data: null
    };

  }

  search() {
    console.log('searching ', this.props.query)
    let callPromise = this.model.load('search', this.props.query, (data) => {
      console.log('search data: ', data);
      
      this.setState({
        data: data
      });
    })
  }

  componentDidMount() {
    this.search();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.query !== this.props.query) {
      this.search();
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

  selectAlbum(e, album_id, track_id) {
    e.preventDefault();
    //console.log('select album ', id);

    let eventData={
      panel: 'album',
      id: album_id,
      track_id: track_id
    }
    this.model.pubsub.emit('selectAlbum', eventData);
  }

  render() {
    if (this.state.data) { 
      return (
        <div className="saved-album-panel">
          <div className="heading">
            <h1>Search Results</h1>
          </div>
          <ul>
            {
              this.state.data.tracks.items.map( (item, index) => {
                return (
                  <li key={index}>
                    <a className="albumBox" href="#" onClick={e => {this.selectAlbum(e, item.album.id, item.id)}}>
                      <img src={this.getImages(item.album.images)} />
                      <p className="hilight">{item.name}</p>
                      <p className="hilight">{item.album.name}</p> 
                      <p>{item.album.release_date}</p>
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