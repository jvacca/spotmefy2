import React, { Component } from 'react';
import TrackItem from './TrackItem';

export default class TrackList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      filterString: '',
      tracks: null,
      currentTrackIndex: -1
    }

    this.onSelect = this.onSelect.bind(this);
    this.onSort = this.onSort.bind(this);
    this.onFilter = this.onFilter.bind(this);
  }

  componentDidMount() {
    this.setState({
      id: this.props.playlist,
      tracks: this.props.tracks
    })
  }

  componentDidUpdate(prevProps, nextProps) {
    if (this.state.id !== this.props.playlist) {
      console.log("udpated");
      
      this.setState({
        id: this.props.playlist,
        tracks: this.props.tracks
      })
    }
    
  }

  onSelect(index) {
    this.setState({
      currentTrackIndex: index-1
    });
  }

  onSort(sortString) {
    console.log("Sorting on ", sortString);
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
    console.log("Filtering ", e.target.value)

    let filterString = e.target.value;
    let filteredState = this.props.tracks.filter(item => (
      (item.track.artists[0].name.includes(filterString) === true) ||
      (item.track.album.name.includes(filterString) === true) ||
      (item.track.name.includes(filterString) === true)
    ));
    console.log('**************', filteredState)
    //if (filteredState.length === 0) filteredState = this.props.tracks;
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
                <span className="index">#</span>
                <span className="like"></span>
                <span onClick={e => {this.onSort('name')}} className="song-name">TITLE</span>
                <span onClick={e => {this.onSort('artist')}} className="artist-name">ARTIST</span>
                <span onClick={e => {this.onSort('album')}} className="album-name">ALBUM</span>
                <span onClick={e => {this.onSort('duration')}} className="duration">DURATION</span>
              </p>
            </li>
            { this.state.tracks && this.state.tracks.map( (item, index) => {
              let isActive = (index === this.state.currentTrackIndex)? true: false;
              let albumImage;
              
              return (
                <TrackItem
                  key={index}
                  index={index + 1}
                  trackName={item.track.name}
                  trackData={item.track}
                  artists={item.track.artists}
                  albumName={item.track.album.name}
                  duration={item.track.duration_ms}
                  album_id={item.track.album.id}
                  album_images={item.track.album.images}
                  songPath={item.track.preview_url}
                  active={isActive}
                  onSelect={this.onSelect}
                  isAlbumView={false}
                />)
            }) }
        </ol>    
      </div>)
  }
  
}