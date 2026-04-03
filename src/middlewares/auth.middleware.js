const { verifyToken } = require("../services/auth.service");

const authMiddleware = (req, res, next) => {
  const accessToken = req.cookies?.accessToken;

  if (!accessToken) {
    return res.status(401).json({ success: false, message: 'Unauthorized, no access token' });
  }

  try {
    const decoded = verifyToken(accessToken);
    req.user = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Access token expired or invalid',
      shouldRefresh: true 
    });
  }
};

module.exports = authMiddleware;