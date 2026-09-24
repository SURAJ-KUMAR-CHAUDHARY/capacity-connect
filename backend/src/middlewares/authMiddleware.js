const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(403).json({ message: 'No token provided.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized! Invalid token.' });
    }
    req.userId = decoded.id;
    req.userRole = decoded.role;
    req.userStatus = decoded.status;
    next();
  });
};

const requireRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.userRole)) {
      return res.status(403).json({ message: 'Require Role: ' + roles.join(' or ') });
    }
    next();
  };
};

const requireApproved = (req, res, next) => {
  if (req.userStatus !== 'approved') {
    return res.status(403).json({ message: 'Your account is pending approval.' });
  }
  next();
};

module.exports = {
  verifyToken,
  requireRole,
  requireApproved
};
