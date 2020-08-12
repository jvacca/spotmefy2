import React, { Component } from "react";
import {connect} from 'react-redux';
import * as Actions from '../actions';
import {Link} from 'react-router-dom';
import * as Utils from '../utils';

const mapStateToProps = state => ({
  data: state.fetchedData['search']
});

const mapDispatchToProps = dispatch => ({
  load: (which, id) => dispatch(Actions.fetchData(which, id))
});

class SearchComponent extends Component {
  constructor(props) {
    super(props);

    this.onSearch = this.onSearch.bind(this);
    this.state = {
      searchString: '',
      query: ''
    };
  }

  search() {
    console.log('searching ')
    let callPromise = this.props.load('search', this.state.searchString);
    this.setState({
      query: this.state.searchString
    });
  }

  componentDidMount() {
    //this.search();
  }

  componentDidUpdate(prevProps) {
    if (this.state.searchString !== '' && this.state.searchString !== this.state.query) {
      this.search();
    }
  }

  onSearch(e) {
    this.setState({
      searchString: e.target.value
    });
  }
  

  render() {

      return (
        <div className="search-panel">
          <div className="search">Search:&nbsp; <input type="text" id="search_string" onChange={this.onSearch} value={this.state.searchString} placeholder="Search"></input></div>
          <div className="heading">
            <h1>Search Results</h1>
          </div>
          <ul>
            {
              this.props.data && this.props.data.tracks.items.map( (item, index) => {
                return (
                  <li key={index} className="albumBox">
                    <Link to={`/album/${item.album.id}/${item.id}`}>
                      <img src={Utils.getImages(item.album.images)} />
                      <p className="hilight">{item.name}</p>
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
  }
}

const Search = connect(mapStateToProps, mapDispatchToProps)(SearchComponent);
export default Search;