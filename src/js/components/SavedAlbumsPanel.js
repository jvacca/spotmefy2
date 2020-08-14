import React, { Component } from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as Actions from '../actions';
import {Link} from 'react-router-dom';
import * as Utils from '../utils';

const mapStateToProps = state => ({
  albumData: state.fetchedData['getPutSavedAlbums']
});

const mapDispatchToProps = dispatch => ({
  load: (which, id) => dispatch(Actions.fetchData(which, id))
});

class SavedAlbumsPanelComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let callPromise = this.props.load('getPutSavedAlbums', null);
  }

  componentDidUpdate(prevProps) {

  }

  render() {
    if (this.props.albumData) { 
      return (
        <div className="saved-album-panel">
          <div className="heading">
            <h1>Albums</h1>
          </div>
          <ul>
            {
              this.props.albumData.items.map( (item, index) => {
                return (
                  <li key={index} className="albumBox">
                    <Link to={`/album/${item.album.id}`}>
                      <img src={Utils.getImages(item.album.images)} />
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

SavedAlbumsPanelComponent.propTypes = {
  albumData: PropTypes.object,
  load: PropTypes.func
}

const SavedAlbumsPanel = connect(mapStateToProps, mapDispatchToProps)(SavedAlbumsPanelComponent);
export default SavedAlbumsPanel