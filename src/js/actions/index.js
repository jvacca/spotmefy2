export const PLAY_PLAYLIST = 'PLAY_PLAYLIST';
export const PLAY_ALBUM = 'PLAY_ALBUM';
export const PLAY_SINGLE_TRACK = 'PLAY_SINGLE_TRACK';
export const PREVIOUS_TRACK = 'PREVIOUS_TRACK';
export const NEXT_TRACK = 'NEXT_TRACK';
export const RESET_CURRENT_TRACK_INDEX = 'RESET_CURRENT_TRACK_INDEX';

export const FETCH_ALBUM_PLAYLIST = 'FETCH_ALBUM_PLAYLIST';
export const DATA_LOADED = 'DATA_LOADED';

export const playPlaylist = (data) => ({
  type: PLAY_PLAYLIST,
  payload: data
})

export const playAlbum = (data) => ({
  type: PLAY_ALBUM,
  payload: data
})

export const playSingleTrack = (data) => ({
  type: PLAY_SINGLE_TRACK,
  payload: data
})

export const prevTrack = () => ({
  type: PREVIOUS_TRACK
})

export const nextTrack = () => ({
  type: NEXT_TRACK
})

export const resetCurrentTrackIndex = () => ({
  type: RESET_CURRENT_TRACK_INDEX
})

export const fetchAlbumPlaylist = (which, id) => ({
  type: FETCH_ALBUM_PLAYLIST,
  id: id,
  which: which,
})

export const dataLoaded = (data, which) => ({
  type: DATA_LOADED,
  which: which,
  payload: data
})





let getParameterByName = (name, url) => {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const access_token = getParameterByName('access_token');
const refresh_token = getParameterByName('refresh_token');

if (access_token === null ) window.location.href="/login";

const APIBaseUrl = 'https://api.spotify.com/';
const endpoints = {
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

export const load = (which, id) => {
  return (dispatch) => {
  //console.log('LOADING: ', which, id)
  let url = (id !== null && typeof id !== 'undefined' && which !== 'search')? APIBaseUrl + endpoints[which].uri + id : APIBaseUrl + endpoints[which].uri;
  if (which === 'artistAlbums') url += '/albums?market=US&include_groups=album,single';
  if (which === 'artistTopTracks') url += '/top-tracks?country=US';
  if (which === 'search') url += '?q=' + encodeURI(id) + '&type=artist,album,track'

  return fetch(url, {
    method: 'GET',
    cache: 'no-cache',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + access_token
      }
    })
    .then((res) => res.json())
    .then(
      (data) => {
        //console.log("Success: Call to " + url + " succeded");
        dispatch(dataLoaded(data, which));
      },
      (error) => {
        console.error("Fail: Call to " + url + " ended in an error", error);
      })
    .catch((error) => {
      console.error('Error:', error);
    })
  }
}

const save = (which, id, resolve) => {
  let url = APIBaseUrl + endpoints[which].uri + '?ids=' + id;

  fetch(url, {
    method: 'PUT',
    cache: 'no-cache',
    headers: {
        'Authorization': 'Bearer ' + access_token
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