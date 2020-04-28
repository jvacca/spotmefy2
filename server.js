const express = require('express');
const app = express();
const request = require('request');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');

const client_id = 'fc26053f4a44411c9fc7077e35cec0e7';
const client_secret = 'bd241b3266954b0da04cdb7f40a28fd0';
const redirect_uri = 'localhost:1111/callback';
const authorize_uri = 'https://accounts.spotify.com/authorize?';
const stateKey = 'spotify_auth_state';
const scope = 'user-read-private user-read-email';

let generateRandomString = (length) => {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};



app.use(express.static(__dirname + '/pubic')).use(cookieParser());

app.get('/login', (req, res) => {
  console.log("logging in");

  let state = generateRandomString(16);
  res.cookie(stateKey, state)
  
  res.redirect(authorize_uri + querystring.stringify({
    response_type: 'code',
    client_id: client_id,
    scope: scope,
    redirect_uri: redirect_uri
  }));
});

app.get('/callback', (req, res) => {
  console.log("called back");

  let code = req.query.code || null;
  let state = req.query.state || null;
  let storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || sate !== storedState) {
    res.redirect('/#' + querystring.stringify({
      error:'state_mismatch'
    }))
  } else {
    res.clearCookie(stateKey);
    let authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };
  }
  

  request.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      console.log("Success!")
      let access_token = body.access_token,
          refresh_token = body.refresh_token;

      let options = {
        url: 'https://api.spotify.com/v1/me',
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
      };

      request.get(options, (error, response, body) => {
        console.log(body);

        res.redirect('/#' + querystring.stringify({
          access_token: access_token,
          refresh_token: refresh_token
        }))
      })
    } else {
      console.log("invalid token");

      res.redirect('/#' + querystring.stringify({
        error: 'invalid_token'
      }));
    }
  });
});

app.get('/refresh_token', function(req, res) {

  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});

app.listen(1111, () => {
  console.log("listening on 1111");
});