import React from 'react';
import ReactDOM from 'react-dom';
import MainPanel from './components/MainPanel';
import Playlist from './components/Playlist';

import album_cache from './album_cache';
import artist_cache from './artist_cache';

export default class Router {

  constructor(model) {
    this.model = model;
  }

  initialize() {
    console.log("Routing...")
    /*
    let getTracks_id = '23FJTTzUIUjhmimOE2CTX2';
    let getArtist_id = '36QJpDe2go2KgaRleHCDTp';*/
    let playlist_id = '1AxmCxi4kmVM3pwwqqq2sD';

    let Router = Backbone.Router.extend({
      routes: {
        'playlist/:id': 'playlist',
        'artist/:id': 'artist',
        'album/:id': 'album',

        playlist: (id) => {
          console.log("duuude*************", id)
          
        
            ReactDOM.render(<Playlist model={this.model} id={playlist_id} />, document.getElementById('main-panel'));
        
        }
        /*
        album: (id) => {
          let callPromise = this.model.fetch('albumTracks', id, (data) => {
            console.log('data: ', data);
        
            ReactDOM.render(<MainPanel data={data} viewState="albums-view" />, document.getElementById('main-panel'));
          });
        },
        artist: (id) => {
          let callPromise = this.model.fetch('artist', id, (data) => {
            console.log('data: ', data);
        
            ReactDOM.render(<MainPanel data={data} viewState="artists-view" />, document.getElementById('main-panel'));
          });
        }*/
      }
    });

    let app_router = new Router();
/*
    $("#albums").on('click', (e) => {
      e.preventDefault();
      Backbone.history.navigate('#album', {trigger:true});
    })

    $("#artists").on('click', (e) => {
      e.preventDefault();
      Backbone.history.navigate('#artist', {trigger:true});
    })*/

    Backbone.history.start({ pushState: true });

    app_router.navigate('#playlist', {trigger:true});
  }
   
}