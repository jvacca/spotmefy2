import {load, save} from './DataProvider';

export const PLAY_PLAYLIST = 'PLAY_PLAYLIST';
export const PLAY_ALBUM = 'PLAY_ALBUM';
export const PLAY_SINGLE_TRACK = 'PLAY_SINGLE_TRACK';
export const PREVIOUS_TRACK = 'PREVIOUS_TRACK';
export const NEXT_TRACK = 'NEXT_TRACK';
export const RESET_CURRENT_TRACK_INDEX = 'RESET_CURRENT_TRACK_INDEX';

export const FETCH_DATA = 'FETCH_DATA';
export const FETCH_ERROR = 'FETCH_ERROR';
export const DATA_LOADED = 'DATA_LOADED';
export const SAVE_DATA = 'SAVE_DATA';

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

/* Todo: fetchData and saveData are actions that examine the fetchedData state and see if an ajax call was already made
and return a cached version or if not, make an ajax call(via DataProvider functions). Essentially, both are actions calling another action
via disptach */
export const fetchData = (which, id) => {
  return (dispatch, getState) => {
    return dispatch(load(which, id))
  }
}

export const saveData = (which, id) => {
  return (dispatch, getState) => {
    return dispatch(save(which, id))
  }
}

export const dataLoaded = (data, which) => ({
  type: DATA_LOADED,
  which: which,
  payload: data
})

export const dataFetchError = (data, which) => ({
  type: FETCH_ERROR,
  which: which,
  payload: data
})