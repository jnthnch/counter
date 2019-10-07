const router = require('express').Router();
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

router.post('/login', (req, res) => {
  const user = {
    id: 1,
    username: 'jon',
  }

  jwt.sign(user, process.env.SECRET_TOKEN, { expiresIn: "10h" }, (err, token) => {
    if (err) {
      res.status(500);
      res.json({
        message: 'Error creating token',
      });
    } else {
      res.cookie('token', token, {
        httpOnly: true,
      });

      res.json({
        your_token: token,
      });
    }
  });
});

function authenticateToken(req, res, next) {
  let cookie = req.headers['cookie'];
  if (!cookie) {
    res.status(403);
    res.json({
      auth: false,
      message: 'No cookie',
    });
  }

  let token = cookie.split('=')[1];
  if (typeof token !== 'undefined') {
    req.token = token;
    jwt.verify(req.token, process.env.SECRET_TOKEN, (error, data) => {
      if (error) {
        res.status(403);
        res.json({
          auth: false,
          message: 'Not An Authorized User'
        });
      } else {
        res.status(200);
      }
    })
    next();
  } else {
    res.sendStatus(403);
  }
}

module.exports = {
  router,
  authenticateToken,
};
