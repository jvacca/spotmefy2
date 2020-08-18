import React, { Component } from "react";
import TrackItem from './TrackItem';

const SimplerTrackList = ({id, tracks, artists, images, currentTrackIndex, onPlayTrack, isAlbumView}) => (
    <ol>
      <li className="header">
        <p>
          <span className="index">#</span>
          <span className="like"></span>
          <span className="song-name">TITLE</span>
          <span className="artist-name">{(tracks[0].artists && !isAlbumView)? 'ARTISTS' : ''}</span>
          <span className="album-name">{(tracks[0].album && !isAlbumView)? 'ALBUM' : ''}</span>
          <span className="duration">DURATION</span>
        </p>
      </li>
      {
        tracks.map( (item, index) => {
          let isActive = (currentTrackIndex === index)

          return (
            <TrackItem
              key={index}
              index={index + 1}
              trackName={item.name}
              trackData={item}
              artists={(item.artists || artists || '')}
              albumName={((item.album && item.album.name) || '')}
              added_at={''}
              duration={item.duration_ms}
              group_id={id || ''}
              album_id={((item.album && item.album.id) || '')}
              album_images={((item.album && item.album.images) || images || '')}
              songPath={item.preview_url}
              active={isActive}
              isAlbumView={isAlbumView}
              onPlayTrack = {onPlayTrack}
            />
          )
        })
      }
    </ol>
)

export default SimplerTrackList;