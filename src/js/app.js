import '../scss/page.scss';
import Model from './model';
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import reducer from './reducers';
import AppRouter from './components/AppRouter';

console.log("Initializing");

let getParameterByName = (name, url) => {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

let access_token = getParameterByName('access_token');
let refresh_token = getParameterByName('refresh_token');

if (access_token === null ) window.location.href="/login";

let appModel = new Model(access_token, refresh_token);

let fullScreen = () => {
  document.getElementById('app').style.width = window.innerWidth + 'px';
  document.getElementById('app').style.height = window.innerHeight + 'px';
}
window.onresize = () => {
  fullScreen();
}
fullScreen();

const store = createStore(reducer);
console.log('state:')
console.log(store.getState())
const unsubscribe = store.subscribe(() => {
  console.log('state:')
  console.log(store.getState())
});


ReactDOM.render (
    <AppRouter store={store} />, document.getElementById('app')
);
