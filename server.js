const express = require('express');
const app = express();
const request = require('request');
const querystring = require('querystring');

const client_id = 'fc26053f4a44411c9fc7077e35cec0e7';
const client_secret = 'bd241b3266954b0da04cdb7f40a28fd0';
const redirect_uri = 'localhost:1111';
const authorize_uri = 'https://accounts.spotify.com/authorize?';

app.use(express.static(__dirname + '/pubic'));

app.get('/login', (req, res) => {
  let scope = 'user-read-private user-read-email';

  res.redirect(authorize_uri + querystring.stringify({
    response_type: 'code',
    client_id: client_id,
    scope: scope,
    redirect_uri: redirect_uri
  }));
});

app.get('/callback', (req, res) => {
  let code = req.query.code || null;

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

  request.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      let access_token = body.access_token,
          refresh_token = body.refresh_token;

      let options = {
        url: 'https://api.spotify.com/v1/me',
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
      };

      request.get(options, (error, response, body) => {
        console.log(body);
      })
    } else {
      console.log("invalid token");
    }
  })
})

app.listen(1111, () => {
  console.log("listening on 1111");
});