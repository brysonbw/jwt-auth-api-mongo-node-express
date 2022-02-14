const jwt = require("jsonwebtoken");
require('dotenv').config()

const validateToken = (req, res, next) => {
    // if token not found
  const accessToken = req.header("accessToken");

  if (!accessToken) {
    return res.status(401).json({auth: false, error: 'Token not found' });
  } 

  // verify access token
  try {
    const decoded = jwt.verify(accessToken, `${process.env.ACCESS_SECRET}`); 
    if (decoded) {
      req.user = decoded
      return next();
    }
  } catch (error) {
    res.status(400).json({
    auth: false,
   error: 'Invalid token'
})
  }
};


module.exports = { validateToken };