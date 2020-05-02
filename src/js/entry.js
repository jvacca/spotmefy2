import '../scss/page.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import ArtistDisplay from './components/ArtistDisplay';
import AlbumTracksView from './components/AlbumTracksView';
import Model from './model';


$(document).ready(function(){
  console.log("Initializing");

  let model = new Model()

  let callPromise = model.fetch('23FJTTzUIUjhmimOE2CTX2', (data) => {
    console.log('data: ', data);

    ReactDOM.render(<AlbumTracksView albumData={data} />, document.getElementById('page-container'));
  });

});