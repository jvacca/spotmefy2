 export const formatDate = (date) => {
  let dateObj = new Date(date);
  let formatted = '';
  let month = ((dateObj.getMonth() < 10)? '0' : '') + (dateObj.getMonth() + 1);
  let day = ((dateObj.getDay() < 10)? '0': '') + dateObj.getDay();
  formatted += dateObj.getFullYear() + '-' + month + '-' + day;
  return formatted;
}

export const formatDuration = (ms) => {
  let time = ''
  let minutes = Math.floor((ms/1000)/60);
  let seconds = Math.floor((ms/1000)%60);
  time += (minutes < 10)? '0': '';
  time += minutes + ':';
  time += (seconds < 10)? '0': '';
  time += seconds;
  return time;
}
  
export const getImages = (album_images) => {
  if (album_images && album_images.length > 0) {
    if (album_images.length > 1) 
      return album_images[1].url;
    else
      return album_images[0].url
  } else {
    return null;
  }
}

export const getArtistNames = (artists) => {
  let artistArr = artists.map((artist, index) => ( artist.name ));
  return artistArr.join(', ');
}