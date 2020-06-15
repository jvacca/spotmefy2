const express = require('express');
const app = express();
const request = require('request');
const handlebars = require('express-handlebars');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');

const env = process.env.NODE_ENV || 'local';
const client_id = 'fc26053f4a44411c9fc7077e35cec0e7';
const client_secret = 'bd241b3266954b0da04cdb7f40a28fd0';
const redirect_uri = (env === 'local')? 'http://localhost:1111/callback' : 'https://spotmefy2.herokuapp.com/callback';
const authorize_uri = 'https://accounts.spotify.com/authorize?';
const stateKey = 'spotify_auth_state';
const scope = 'user-read-private user-read-email user-library-read user-library-modify';
const PORT = process.env.PORT || 1111;
let hasToken = false;


let generateRandomString = (length) => {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
  layoutsDir: __dirname + '/views/layouts',
  extname: 'hbs'
}));

app.use(express.static(__dirname + '/public')).use(cookieParser());

app.get('/', (req, res) => {
  console.log("index page!");
  
  if (hasToken === true) {
    console.log("has token")
    res.render('main', {layout: 'index', apiData:{version:'1.0.0'}});
    hasToken = false;
  } else {
    console.log("No token yet")
    res.redirect('/login');
  }
});

app.get('/login', (req, res) => {
  console.log("logging in");

  let state = generateRandomString(16);
  res.cookie(stateKey, state);
  
  res.redirect(authorize_uri + querystring.stringify({
    response_type: 'code',
    client_id: client_id,
    scope: scope,
    redirect_uri: redirect_uri,
    state: state
  }));
});

app.get('/callback', (req, res) => {
  console.log("called back");

  let code = req.query.code || null;
  let state = req.query.state || null;
  let storedState = req.cookies ? req.cookies[stateKey] : null;
  let authOptions;

  if (state === null || state !== storedState) {
    res.redirect('/#' + querystring.stringify({
      error:'state_mismatch'
    }))
  } else {
    res.clearCookie(stateKey);
    authOptions = {
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
  
  return new Promise( (resolve, reject) => {
    request.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        console.log("Success!");
        console.log('body: ',body);

        let access_token = body.access_token,
            refresh_token = body.refresh_token;

        hasToken = true;
        resolve(access_token, refresh_token)
      } else {
        console.log("invalid token");
        
        res.redirect('/error?' + querystring.stringify({
          error: 'invalid_token'
        }));
      }
    });
  })
  .then((access_token, refresh_token) => {
    res.redirect('/?' + querystring.stringify({
      access_token: access_token,
      refresh_token: refresh_token
    }))
  });
});

app.get('/refresh_token', (req, res) => {
  let refresh_token = req.query.refresh_token;
  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  return new Promise( (resolve, reject) => {
    request.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        console.log("token refreshed ", body.access_token);
        let access_token = body.access_token;
        
        resolve(access_token);
      } else {
        console.log("invalid token");
  /*
        res.redirect('/?' + querystring.stringify({
          error: 'invalid_token'
        }));*/

        //reject();
      }
    })
  })
  .then((access_token) => {
    res.send({
      'access_token': access_token
    });
  });
});

app.get('/error', (req, res) => {
  console.log('error page')
  
  res.send('error page')
});

app.get('*', (req, res) => {
  console.log('unknown route, redirecting to /')
  
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log("Wintermute ready")
  console.log("env: ", env);
  console.log("listening on ", PORT);
});