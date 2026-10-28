const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized to access this route, token missing.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'hotelpro_super_secure_jwt_secret_key_2026');
    try {
      req.user = await User.findById(decoded.id);
    } catch (err) {
      // In-memory fallback mock user
      req.user = { _id: decoded.id, role: decoded.role || 'guest', email: decoded.email || 'guest@hotelpro.com' };
    }
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token.' });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role '${req.user ? req.user.role : 'none'}' is not authorized to access this resource.`,
      });
    }
    next();
  };
};

module.exports = { protect, authorize };
