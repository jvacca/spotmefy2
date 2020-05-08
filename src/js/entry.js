import '../scss/page.scss';
import Model from './model';
import React from 'react';
import ReactDOM from 'react-dom';
import MainPanel from './components/MainPanel';

console.log("Initializing");

document.getElementById('app').style.width = window.innerWidth + 'px';
document.getElementById('app').style.height = window.innerHeight + 'px';

let appModel = new Model();

ReactDOM.render (
  <MainPanel />, document.getElementById('app')
);
