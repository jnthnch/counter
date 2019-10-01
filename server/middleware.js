const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const withAuth = function (req, res, next) {
  const bearerHeader = req.headers['authorization'];
  let bearer;
  let token;
  if (typeof bearerHeader !== 'undefined') {
    bearer = bearerHeader.split(' ');
    token = bearer[1];
    req.token = token;
  }

  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(token, process.env.SECRET_TOKEN, function (err, decoded) {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
      } else {
        req.email = decoded.email;
        next();
      }
    });
  }
}
module.exports = withAuth;