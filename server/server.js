const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const authenticationRoute = require('./auth');
const withAuth = require('./middleware');
const app = express();

dotenv.config();

let count = 0

function incrementCount() {
  count += 1
}

app.set('port', process.env.PORT || 3000);

app.use('/', express.static(path.join(__dirname, '../public')));

app.use('/api/users', authenticationRoute);

app.get('/api/authenticate', withAuth, (req, res) => {
  res.send('token works!')
})

app.post('/api/increment', (req, res) => {
  incrementCount();
  res.send(`${count}`);
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.listen(app.get('port'), () => {
  console.log(`Server started: http://localhost:${app.get('port')}/`);
});
