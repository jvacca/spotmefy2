import React, { Component } from "react";
import {Link} from 'react-router-dom';

export default class Heading extends Component {
  constructor() {
    super();

    this.state = {
      data: ""
    };
  }

  render() {
    return (
      <div className="app-heading">
        <h1>SPOTMEFY</h1>
      </div>
    )
  }
}