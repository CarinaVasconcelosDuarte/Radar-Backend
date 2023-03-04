const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');

let checkToken = (req, res, next)  => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET, (err , decoded) => {
    if (err) return res.sendStatus(403).send('Token is not valid');
    req.decoded = decoded;
    next();
  })
};

module.exports = {
    checkToken: checkToken
};