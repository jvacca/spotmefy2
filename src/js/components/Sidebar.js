import React, { Component } from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as Actions from '../actions';
import {Link} from 'react-router-dom';
import Utils from '../utils';

const mapStateToProps = state => ({
  playlists: state.fetchedData['playlists']
});

const mapDispatchToProps = dispatch => ({
  load: (which, id) => dispatch(Actions.fetchData(which, id))
});

class SidebarComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentIndex: -1
    };

    this.select = this.select.bind(this);
  }

  componentDidMount() {
    let callPromise = this.props.load('playlists', null);
  }

  componentDidUpdate() {
    //console.log("Updated!");
  }

  select(count) {
    //console.log("count ", count)
    this.setState({
      currentIndex: count
    });
  }

  render() {
    //console.log("state ", this.props.playlists)
    return (
      <div className="side-panel">
        <p>YOUR LIBRARY</p>
        <ul>
          <li><Link to="/savedalbums">Liked Albums</Link></li>
          <li><Link to="/savedtracks">Liked Songs</Link></li>
        </ul>
        <p>PLAYLISTS</p>
        <ul className="playlist-container">
          {
            this.props.playlists && this.props.playlists.items.map( (item, index) => {
              let classNameName = (index === this.state.currentIndex)? 'active': ''
              return (
                <li key={index} className={classNameName}>
                  <Link to={`/playlist/${item.id}`} onClick={e => {this.select(index)}}>
                    <span className="playlist-name">{item.name}</span> 
                  </Link>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

SidebarComponent.propTypes = {
  data: PropTypes.object,
  load: PropTypes.func
}

const Sidebar = connect(mapStateToProps, mapDispatchToProps)(SidebarComponent);
export default Sidebar;