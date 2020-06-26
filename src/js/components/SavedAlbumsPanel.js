import React, { Component } from "react";
import {Link} from 'react-router-dom';
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
      //console.log('data: ', data);
      
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

  render() {
    if (this.state.albumData) { 
      return (
        <div className="saved-album-panel">
          <div className="heading">
            <h1>Albums</h1>
          </div>
          <ul>
            {
              this.state.albumData.items.map( (item, index) => {
                return (
                  <li key={index} className="albumBox">
                    <Link to={`/album/${item.album.id}`}>
                      <img src={this.model.getImages(item.album.images)} />
                      <p className="hilight">{item.album.name}</p> 
                      <p>{item.album.release_date}</p>
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