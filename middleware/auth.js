const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

//Function that has access to the req, res objects.
//Call back is for the next piece of middleware.
module.exports = function(req, res, next) {
  //Pull token from header
  const token = req.header("x-auth-token");
  //Check if there isn't a token
  if (!token) {
    return res.status(401).json({ message: "No token, auth denied!" });
  }
  //Verify if there is a token
  try {
    const decoded = jwt.verify(token, keys.jwtSecret);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token isnt valid!" });
  }
};
