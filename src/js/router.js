import React from 'react';
import ReactDOM from 'react-dom';
import MainPanel from './components/MainPanel';

import album_cache from './album_cache';
import artist_cache from './artist_cache';

export default class Router {

  constructor(model) {
    this.model = model;
  }

  initialize() {
    
    let getTracks_id = '23FJTTzUIUjhmimOE2CTX2';
    let getArtist_id = '36QJpDe2go2KgaRleHCDTp';

    let Router = Backbone.Router.extend({
      routes: {
        '': 'artist',
        'artist': 'artist',
        'album': 'album',
        album: () => {
          /*
          let callPromise = this.model.fetch('albumTracks', getTracks_id, (data) => {
            console.log('data: ', data);
        
            ReactDOM.render(<MainPanel data={data} viewState="albums-view" />, document.getElementById('main-panel'));
          });*/
          ReactDOM.render(<MainPanel data={album_cache} viewState="albums-view" />, document.getElementById('main-panel'));
        },
        artist: () => {
          /*
          let callPromise = this.model.fetch('artist', getArtist_id, (data) => {
            console.log('data: ', data);
        
            ReactDOM.render(<MainPanel data={data} viewState="artists-view" />, document.getElementById('main-panel'));
          });*/
          ReactDOM.render(<MainPanel data={artist_cache} viewState="artists-view" />, document.getElementById('main-panel'));
        }
      }
    });

    let app_router = new Router();

    $("#albums").on('click', (e) => {
      e.preventDefault();
      Backbone.history.navigate('#album', {trigger:true});
    })

    $("#artists").on('click', (e) => {
      e.preventDefault();
      Backbone.history.navigate('#artist', {trigger:true});
    })

    Backbone.history.start({ pushState: true });
  }
   
}