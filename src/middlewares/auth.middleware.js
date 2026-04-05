const { verifyToken, refreshTokens } = require("../services/auth.service");
const setAuthCookie = require("../utils/setAuthCookie");

const authMiddleware = async (req, res, next) => {
  const accessToken = req.cookies?.accessToken;
  const refreshToken = req.cookies?.refreshToken;

  // No tokens at all 
  if (!accessToken && !refreshToken) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
      shouldLogin: true
    });
  }

  const refreshTheAccessToken = async () => {
    try {
      const newTokens = await refreshTokens(refreshToken);
      setAuthCookie(res, "accessToken", newTokens, 15 * 60 * 1000);

      const decoded = verifyToken(newTokens.accessToken);
      req.user = decoded.id;
      return next();
    } catch {
      return res.status(401).json({
        success: false,
        message: "Session expired",
        shouldLogin: true
      });
    }
  }

  // Has access token 
  if (accessToken) {
    try {
      const decoded = verifyToken(accessToken);
      req.user = decoded.id;
      return next();
    } catch {
      return await refreshTheAccessToken()
    }
  }

  // No access token but has refresh token
  if (refreshToken) {
    return await refreshTheAccessToken()
  }
};

module.exports = authMiddleware;