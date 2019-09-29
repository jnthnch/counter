const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const authenticationRoute = require('./auth');
const app = express();

dotenv.config();

app.set('port', process.env.PORT || 3000);

app.use('/', express.static(path.join(__dirname, '../public')));

app.use('/api/user', authenticationRoute);


app.listen(app.get('port'), () => {
  console.log(`Server started: http://localhost:${app.get('port')}/`);
});


