import React, { Component } from "react";
import {Link} from 'react-router-dom';
import Model from '../model';

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.model = new Model();
    this.onSearch = this.onSearch.bind(this);
    this.state = {
      data: null,
      searchString: '',
      query: ''
    };

  }

  search() {
    console.log('searching ')
    let callPromise = this.model.load('search', this.state.searchString, (data) => {
      console.log('search data: ', data);
      
      this.setState({
        data: data,
        query: this.state.searchString
      });
    })
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
              this.state.data && this.state.data.tracks.items.map( (item, index) => {
                return (
                  <li key={index} className="albumBox">
                    <Link to={`/album/${item.album.id}/${item.id}`}>
                      <img src={this.model.getImages(item.album.images)} />
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