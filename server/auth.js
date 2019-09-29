const router = require('express').Router();
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

router.post('/login', (req, res) => {
  const user = {
    id: 1,
    username: 'jon'
  }

  jwt.sign(user, process.env.SECRET_TOKEN, { expiresIn: '2 days' }, (err, token) => {

    res.cookie('token', token, { httpOnly: false })
    res.json({
      token
    })
    // res.cookie('token', token, { httpOnly: false })
  })
})

router.post('/counter', checkForToken, (req, res) => {
  jwt.verify(req.token, process.env.SECRET_TOKEN, (error, data) => {
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

module.exports = router;