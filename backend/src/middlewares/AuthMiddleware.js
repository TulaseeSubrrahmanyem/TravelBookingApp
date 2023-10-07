const jwt = require('jsonwebtoken');
require('dotenv').config();
const key = process.env.KEY || "jwtSecret" 
console.log("key1",key)
function AuthMiddleware(req, res, next) {
  // Get token from the request headers
  const token = req.header('Authorization')?.split('Bearer ')[1];
  console.log('Received token:', token);

  // Check if there is no token
  if (!token) {
    return res.status(401).json({ message: 'Authorization denied' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, key);

    // Attach the user data to the request object
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error('Error:', err);
    return res.status(401).json({ message: 'Token is not valid' });
  }
};
module.exports = AuthMiddleware