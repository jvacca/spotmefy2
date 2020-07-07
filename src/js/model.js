export default class Model {
  constructor(access_token, refresh_token) {

    if (Model.instance) {
      return Model.instance;
    }

    Model.instance = this;
    Model.APIBaseUrl = 'https://api.spotify.com/';

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
      'userprofile': {
        uri: 'v1/me'
      },
      'history': {
        uri: 'v1/me/top/tracks'
      },
      'playlists': {
        uri: 'v1/me/playlists'
      },
      'playlistTracks': {
        uri: 'v1/playlists/'
      },
      'albumTracks': {
        uri: 'v1/albums/'
      },
      'artist':{
        uri: 'v1/artists/'
      },
      'artistAlbums':{
        uri: 'v1/artists/'
      },
      'artistTopTracks':{
        uri: 'v1/artists/'
      },
      'track':{
        uri: 'v1/tracks/'
      },
      'getPutSavedAlbums':{
          uri: 'v1/me/albums'
      },
      'getPutSavedTracks':{
          uri: 'v1/me/tracks'
      },
      'search':{
          uri: 'v1/search'
      }
    }
  }

  load(which, id, resolve) {
    let url = (id !== null && typeof id !== 'undefined' && which !== 'search')? Model.APIBaseUrl + this.endpoints[which].uri + id : Model.APIBaseUrl + this.endpoints[which].uri;
    if (which === 'artistAlbums') url += '/albums?market=US&include_groups=album,single';
    if (which === 'artistTopTracks') url += '/top-tracks?country=US';
    if (which === 'search') url += '?q=' + encodeURI(id) + '&type=artist,album,track'

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

  save(which, id, resolve) {
    let url = Model.APIBaseUrl + this.endpoints[which].uri + '?ids=' + id;

    fetch(url, {
      method: 'PUT',
      cache: 'no-cache',
      headers: {
          'Authorization': 'Bearer ' + this.access_token
        }
      })
      .then((res) => res.json())
      .then(
        (data) => {
          console.log("Success: Call to " + url + " succeded", data);
          resolve(data);
        },
        (error) => {
          console.error("Fail: Call to " + url + " ended in an error", error);
        })
      .catch((error) => {
        console.error('Error:', error);
    })

  }

  getImages(album_images) {
    if (album_images || album_images.length > 0) {
      if (album_images.length > 1) 
        return album_images[1].url;
      else
        return album_images[0].url
    } else {
      return null;
    }
  }

  getArtistNames(artists) {
    let artistArr = artists.map((artist, index) => ( artist.name ));
    return artistArr.join(', ');
  }

  formatDate(date) {
    let dateObj = new Date(date);
    let formatted = '';
    let month = ((dateObj.getMonth() < 10)? '0' : '') + (dateObj.getMonth() + 1);
    let day = ((dateObj.getDay() < 10)? '0': '') + dateObj.getDay();
    formatted += dateObj.getFullYear() + '-' + month + '-' + day;
    return formatted;
  }

  formatDuration(ms) {
    let time = ''
    let minutes = Math.floor((ms/1000)/60);
    let seconds = Math.floor((ms/1000)%60);
    time += (minutes < 10)? '0': '';
    time += minutes + ':';
    time += (seconds < 10)? '0': '';
    time += seconds;
    return time;
  }
  
}