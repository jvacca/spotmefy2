export default class Model {
  constructor(access_token, refresh_token) {

    if (Model.instance) {
      return Model.instance;
    }

    Model.instance = this;

    if (access_token !== null) {
      this.access_token = access_token;
      this.refresh_token = refresh_token;
    } else {
      console.log("Invalid or empty access token!");
      return;
    }

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
    if (which === 'artistAlbums') url += '/albums?market=US&include_groups=album,single';

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