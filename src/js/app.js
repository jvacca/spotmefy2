import '../scss/page.scss';
import Model from './utils';
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import AppRouter from './components/AppRouter';

console.log("Initializing");

let fullScreen = () => {
  document.getElementById('app').style.width = window.innerWidth + 'px';
  document.getElementById('app').style.height = window.innerHeight + 'px';
}
window.onresize = () => {
  fullScreen();
}
fullScreen();

const store = createStore(reducer, applyMiddleware(thunk));

console.log('first state:')
console.log(store.getState())
const unsubscribe = store.subscribe(() => {
  console.log('state:')
  console.log(store.getState())
});


ReactDOM.render (
    <AppRouter store={store} />, document.getElementById('app')
);
