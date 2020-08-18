import * as Action from '../actions';
import * as Utils from '../utils';

const initialState = {
  id: -1,
  tracks: [],
  currentTrack: {
    album_images: '',
    trackName: 'Tracks',
    artists: 'Choose a track to play',
    duration: 0,
    songPath: ''
  },
  currentTrackIndex: -1
}

const queue = (state = initialState, action) => {
  switch(action.type) {
    case Action.PLAY_PLAYLIST:
      return playPlaylist(action.payload)
    case Action.PLAY_ALBUM:
      return playAlbum(action.payload);
    case Action.PLAY_SINGLE_TRACK:
      return playSingleTrack(state, action.payload);
    case Action.PREVIOUS_TRACK:
      return prevTrack(state);
    case Action.NEXT_TRACK:
      return nextTrack(state);
    case Action.RESET_CURRENT_TRACK_INDEX:
      return resetCurrentTrackIndex(state);
    default:
      return state;
  }
}

const playPlaylist = (payload) => {
  //console.log("playPlayList -> updating queue with: ", payload.tracks);

  let tracks = sanitizeTracks('playlist', payload.tracks);

  return {
    id: payload.id,
    tracks: tracks,
    currentTrack: tracks[0],
    currentTrackIndex: 0
  }
}

const playAlbum = (payload) => {
  //console.log("playAlbum -> updating queue with: ", payload.tracks, payload.album_images);

  let tracks = sanitizeTracks('album', payload.tracks, payload.album_images);

  return {
    id: payload.id,
    tracks: tracks,
    currentTrack: tracks[0],
    currentTrackIndex: 0
  }
}

export default queue;

const playSingleTrack = (state, payload) => {
  //console.log("playSingleTrack -> updating queue with: ", payload.panel, payload.tracks, payload.album_images);
  let tracks = sanitizeTracks(payload.panel, payload.tracks, (typeof payload.album_images !== 'undefined')? payload.album_images : null);
  if (state.id !== payload.id) {
    return {
      id: payload.id,
      tracks: tracks,
      currentTrack: tracks[payload.index],
      currentTrackIndex: payload.index
    }
  } else {
    return {
      ...state,
      currentTrack: tracks[payload.index],
      currentTrackIndex: payload.index
    }
  }
}

const prevTrack = (state) => {
  if (!state) return;
  if (state.tracks.length > 1 && state.currentTrackIndex > 0) {
    let newIndex = state.currentTrackIndex - 1
    return{
      ...state,
      currentTrack: state.tracks[newIndex],
      currentTrackIndex: newIndex
    }
  }
}

const nextTrack = (state) => {
  if (!state) return;
  if (state.tracks.length > 1 && state.currentTrackIndex < state.tracks.length-1) {
    let newIndex = state.currentTrackIndex + 1
    return{
      ...state,
      currentTrack: state.tracks[newIndex],
      currentTrackIndex: newIndex
    }
  }
}

const resetCurrentTrackIndex = (state) => {
  return {
    ...state,
    currentTrackIndex: -1
  }
}

const sanitizeTracks = (which, tracks, album_images) => {
  if (which === 'album') {
    return tracks.map((item, index) => ({
        album_images: Utils.getImages(album_images),
        trackName: item.name,
        artists: Utils.getArtistNames(item.artists),
        songPath: item.preview_url,
        duration: item.duration_ms
      }));
  } else if (which === 'user') {
    return tracks.map((item, index) => ({
      album_images: Utils.getImages(item.album.images),
      trackName: item.name,
      artists: Utils.getArtistNames(item.artists),
      songPath: item.preview_url,
      duration: item.duration_ms
    }));
  } else {
    return tracks.map((item, index) => ({
      album_images: Utils.getImages(item.track.album.images),
      trackName: item.track.name,
      artists: Utils.getArtistNames(item.track.artists),
      songPath: item.track.preview_url,
      duration: item.track.duration_ms
    }));
  }

}