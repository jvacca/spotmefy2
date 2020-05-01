import '../scss/page.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import ArtistDisplay from './components/ArtistDisplay';

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

$(document).ready(function(){
  console.log("Initializing");
  let access_token = getParameterByName('access_token');
  let refresh_token = getParameterByName('refresh_token');

  var ajaxConfig = {
    dataType: 'json',
    url: 'https://api.spotify.com/v1/artists/0OdUWJ0sBjDrqHygGUXeCF',
    method: "GET",
    cache: false,
    headers: {
      Authorization: 'Bearer ' + access_token
    }
  };

  var CMSPromise = $.ajax(ajaxConfig)
  .done(function(data){
    console.log("Success: Call to " + ajaxConfig.url + " succeded");
    console.log(data.name)
    
    ReactDOM.render(<ArtistDisplay name={data.name} image={data.images[0].url} />, document.getElementById('page-container'))
  })
  .fail(function(error) {
    console.error("Fail: Call to " + ajaxConfig.url + " ended in an error", error);
  });

  

  console.log('access_token ',access_token, 'refresh_token ', refresh_token);

  
});