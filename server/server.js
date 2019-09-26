const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');

const app = express();

app.set('port', process.env.PORT || 3000);

app.use('/', express.static(path.join(__dirname, '../public')));

app.get('/api', (req, res) => {
  res.json({
    message: 'GET worked',
  })
})

app.post('/api', (req, res) => {
  res.json({
    message: 'POST worked'
  })
})

// create token on login
app.post('/api/login', (req, res) => {
  const user = {
    id: 1,
    username: 'jon'
  }

  jwt.sign(user, 'secretKey', { expiresIn: '2 days' }, (err, token) => {
    res.cookie('token', token, { httpOnly: false })

    res.json({
      token
    })
    // res.cookie('token', token, { httpOnly: false })
  })
})

// this method requires credentials / token
app.post('/api/counter', checkForToken, (req, res) => {
  jwt.verify(req.token, 'secretKey', (error, data) => {
    if (error) {
      res.sendStatus(403)
    } else {
      res.json({
        message: 'incremented Count!!!',
        data: data
      })
    }
  })
})

app.listen(app.get('port'), () => {
  console.log(`Server started: http://localhost:${app.get('port')}/`);
});


function checkForToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const token = bearer[1];
    req.token = token;
    next();
  } else {
    res.sendStatus(403)
  }
}