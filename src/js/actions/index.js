export const PLAY_PLAYLIST = 'PLAY_PLAYLIST';
export const PLAY_ALBUM = 'PLAY_ALBUM';
export const PLAY_SINGLE_TRACK = 'PLAY_SINGLE_TRACK';
export const PREVIOUS_TRACK = 'PREVIOUS_TRACK';
export const NEXT_TRACK = 'NEXT_TRACK';
export const RESET_CURRENT_TRACK_INDEX = 'RESET_CURRENT_TRACK_INDEX';

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