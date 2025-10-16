/* eslint-env node */
/* global require, module */
const jwt = require("jsonwebtoken");

/**
 * Generates new access and refresh tokens for a user.
 * Uses environment variables when available; falls back to development defaults when not.
 * @param {Object} user - The user object.
 * @param {string} user.id - The user ID.
 * @returns {Object} - An object containing the generated token and refresh token.
 */
const getNewTokens = (user) => {
  // Provide sensible defaults for local development so missing .env doesn't crash the server.
  const secret = process.env.SECRET_KEY || "dev_secret_key";
  const refreshSecret = process.env.REFRESH_SECRET_KEY || "dev_refresh_secret_key";
  const expiresIn = process.env.JWT_EXPIRES_IN || "1h";
  const refreshExpiresIn = process.env.REFRESH_JWT_EXPIRES_IN || "7d";

  if (!process.env.SECRET_KEY || !process.env.REFRESH_SECRET_KEY) {
    // eslint-disable-next-line no-console
    console.warn("Warning: SECRET_KEY or REFRESH_SECRET_KEY not set. Using development defaults.");
  }

  try {
    const token = jwt.sign(
      { id: user.id, email: user.email, type: "access" },
      secret,
      { expiresIn }
    );

    const refreshToken = jwt.sign(
      { id: user.id, email: user.email, type: "refresh" },
      refreshSecret,
      { expiresIn: refreshExpiresIn }
    );

    return { token, refreshToken };
  } catch (err) {
    // Provide a clearer error message which will be returned by the server error handler.
    throw new Error(`Failed to generate tokens: ${err.message}`);
  }
};

module.exports = getNewTokens;
