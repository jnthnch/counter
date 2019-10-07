const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { router, authenticateToken } = require('./auth');
const morgan = require('morgan');
const withAuth = require('./middleware');
const app = express();

app.use(morgan('tiny'));

dotenv.config();

let currentCount = 0
let nextCount = 1;

function incrementCount() {
  if (currentCount === 0) {
    currentCount += 1;
    nextCount = 1;
  } else {
    nextCount = currentCount * 2;
    currentCount = nextCount;
  }
}

app.set('port', process.env.PORT || 3000);

app.use('/', express.static(path.join(__dirname, '../public')));

app.use('/api/users', router);

app.get('/api/authenticate', withAuth, (req, res) => {
  res.send('token works!')
})

app.get('/api/currentcount', authenticateToken, (req, res) => {
  res.json({ currentCount });
})

app.get('/api/possiblecounts', authenticateToken, (req, res) => {
  res.json({ currentCount, nextCount: currentCount === 0 ? 1 : currentCount * 2 });
})

app.post('/api/increment', authenticateToken, (req, res) => {
  incrementCount();
  res.json({ currentCount: currentCount, nextCount: nextCount });
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.listen(app.get('port'), () => {
  console.log(`Server started: http://localhost:${app.get('port')}/`);
});
