export default class Model {
  constructor(access_token, refresh_token) {

    if (Model.instance) {
      return Model.instance;
    }

    Model.instance = this;

    let getParameterByName = (name, url) => {
      if (!url) url = window.location.href;
      name = name.replace(/[\[\]]/g, '\\$&');
      let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
          results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
  
    this.access_token = getParameterByName('access_token');
    this.refresh_token = getParameterByName('refresh_token');

    this.pubsub = new EventEmitter3();

    console.log('access_token ',this.access_token, 'refresh_token ', this.refresh_token);

    this.endpoints = {
      'playlists': {
        uri: 'https://api.spotify.com/v1/me/playlists'
      },
      'playlistTracks': {
        uri: 'https://api.spotify.com/v1/playlists/'
      },
      'albumTracks': {
        uri: 'https://api.spotify.com/v1/albums/'
      },
      'artist':{
        uri: 'https://api.spotify.com/v1/artists/'
      },
      'artistAlbums':{
        uri: 'https://api.spotify.com/v1/artists/'
      },
      'track':{
        uri: 'https://api.spotify.com/v1/tracks/'
      }
    }
  }

  load(which, id, resolve) {
    let url = (id !== null)? this.endpoints[which].uri + id : this.endpoints[which].uri;
    if (which === 'artistAlbums') url += '/albums';

    fetch(url, {
      method: 'GET',
      cache: 'no-cache',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.access_token
        }
      })
      .then((res) => res.json())
      .then(
        (data) => {
          //console.log("Success: Call to " + url + " succeded");
          resolve(data);
        },
        (error) => {
          console.error("Fail: Call to " + url + " ended in an error", error);
        })
      .catch((error) => {
        console.error('Error:', error);
    })
    
  }
  
}