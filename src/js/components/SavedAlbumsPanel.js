import React, { Component } from "react";
import Model from '../model';

export default class SavedAlbumsPanel extends Component {
  constructor(props) {
    super(props);

    this.model = new Model();
    this.state = {
      albumData: null
    };

  }

  loadAlbums(id) {
    let callPromise = this.model.load('getPutSavedAlbums', '', (data) => {
      console.log('data: ', data);
      
      this.setState({
        albumData: data
      });
    })
  }

  componentDidMount() {
    this.loadAlbums(this.props.id);
  }

  componentDidUpdate(prevProps) {

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
    if (this.state.albumData) { 
      return (
        <div className="saved-album-panel">
          <div className="heading">
            <h1>Liked Albums</h1>
          </div>
          <ul>
            {
              this.state.albumData.items.map( (item, index) => {
                return (
                  <li key={index}>
                    <a className="albumBox" href="#" onClick={e => {this.selectAlbum(e, item.album.id)}}>
                      <img src={this.model.getImages(item.album.images)} />
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