const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // token = req.headers.authorization.split(' ')[1];
      token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NWQzNzYwMjI0M2E0NzlkNzBhMGY3OCIsImlhdCI6MTc1MDkzOTQ4OCwiZXhwIjoxNzUzNTMxNDg4fQ.FcSM8GfSX4Iy2RV81prK2-QOrAOx-IJEN4Yf9hjygm8";
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = { id: decoded.id };
      next();
    } catch (err) {
      res.status(401).json({ message: 'Not authorized' });
    }
  } else {
    res.status(401).json({ message: 'No token provided' });
  }
};

module.exports = { protect };