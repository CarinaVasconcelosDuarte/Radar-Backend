require('dotenv').config();
const jwt = require('jsonwebtoken');
const _user = require("../models/user");



let checkToken = (req, res, next)  => {
  const authHeader = req.headers['x-access-token'];

  if (!authHeader) {
    return res.status(403).send({ message : "Token is missing" });
  }

  jwt.verify(authHeader, process.env.ACCESS_TOKEN_SECRET, (err , decoded) => {
    if (err) return res.status(401).send({ message : "Token is not valid" });
    req.userId = decoded.id;
    next();
  })
};

isAdmin = (req, res, next) => {

  _user.findOne({_id: req.userId, admin : true })
      .then(data => {
        if(!data){
          return res.status(403)
          .send({ message : "No administrator rights for this user" });
        }
        next();
        return;
        
      })
      .catch(error => {
          res.status(500).send({
              message: error.message
          })
      });
}

const AuthToken = {
  checkToken,
  isAdmin
}

module.exports = AuthToken