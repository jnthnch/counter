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

app.post('/api/login', (req, res) => {
  const user = {
    id: 1,
    username: 'jon'
  }

  jwt.sign(user, 'secret', (err, token) => {
    res.json({
      token
    })
  })
})


app.listen(app.get('port'), () => {
  console.log(`Server started: http://localhost:${app.get('port')}/`);
});
