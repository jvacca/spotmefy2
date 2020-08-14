import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TrackItem from './TrackItem';

export default class TrackList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterString: '',
      tracks: null
    }

    this.onSort = this.onSort.bind(this);
    this.onFilter = this.onFilter.bind(this);
  }

  componentDidMount() {
    this.setState({
      tracks: this.props.tracks
    })
  }

  componentDidUpdate(prevProps, nextProps) {
    if (prevProps.id !== this.props.id) {
      //console.log("udpated");
      
      this.setState({
        tracks: this.props.tracks
      })
    }
    
  }

  onSort(sortString) {
    //console.log("Sorting on ", sortString);
      let self = this
      let sortedState = this.state.tracks.sort((current, next) => {
        var nameA;
        var nameB;
        
        switch(sortString) {
          case 'name':
            nameA = current.track.name.toUpperCase();
            nameB = next.track.name.toUpperCase();
            break;
          case 'artist':
            nameA = current.track.artists[0].name.toUpperCase();
            nameB = next.track.artists[0].name.toUpperCase();
            break;
          case 'album':
            nameA = current.track.album.name.toUpperCase();
            nameB = next.track.album.name.toUpperCase();
            break;
          case 'duration':
            nameA = current.track.duration_ms;
            nameB = next.track.duration_ms;
            break;
        }

        
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      
        return 0;
      });

      this.setState({
        tracks: sortedState
      });
  }

  onFilter(e) {
    //console.log("Filtering ", e.target.value)

    let filterString = e.target.value;
    let filteredState = this.props.tracks.filter(item => (
      (item.track.artists[0].name.includes(filterString) === true) ||
      (item.track.album.name.includes(filterString) === true) ||
      (item.track.name.includes(filterString) === true)
    ));

    this.setState({
      filterString: filterString,
      tracks: filteredState
    })
  }

  render() {
    return (
      <div>
        <div className="filter">Filter:&nbsp; <input type="text" id="filter_string" onChange={this.onFilter} value={this.state.filter_string} placeholder="Filter"></input></div>
        <ol>
            <li className="header">
              <p>
                <span className="index"></span>
                <span className="like"></span>
                <span onClick={e => {this.onSort('name')}} className="song-name">TITLE</span>
                <span onClick={e => {this.onSort('artist')}} className="artist-name">ARTIST</span>
                <span onClick={e => {this.onSort('album')}} className="album-name">ALBUM</span>
                <span className="date">DATE</span>
                <span onClick={e => {this.onSort('duration')}} className="duration">DURATION</span>
              </p>
            </li>
            { this.state.tracks && this.state.tracks.map( (item, index) => {
              let isActive = (index === this.props.currentTrackIndex)? true: false;
              
              return (
                <TrackItem
                  key={index}
                  index={index + 1}
                  trackName={item.track.name}
                  trackData={item.track}
                  artists={item.track.artists}
                  albumName={item.track.album.name}
                  added_at={item.added_at}
                  duration={item.track.duration_ms}
                  group_id={this.props.id}
                  album_id={item.track.album.id}
                  album_images={item.track.album.images}
                  songPath={item.track.preview_url}
                  active={isActive}
                  isAlbumView={false}
                  onPlayTrack = {this.props.onPlayTrack}
                />)
            }) }
        </ol>    
      </div>)
  }
  
}

TrackList.propTypes = {
  id: PropTypes.string,
  tracks: PropTypes.array,
  artists: PropTypes.object,
  images: PropTypes.string,
  currentTrackIndex: PropTypes.number,
  onPlayTrack: PropTypes.func
}