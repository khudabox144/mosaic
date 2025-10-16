/* eslint-env node */
/* global require, module */
const { UserService } = require("../services/user.serivce");

const login = async (req, res) => {
  if (!req?.body?.email || !req?.body?.password) {
    return res.status(400).json({ message: "Please provide email and password" });
  }

  const { email, password } = req.body;
  const { db } = req.app;

  try {
    const result = await UserService.login(email, password, db);
    return res.status(200).json(result);
  } catch (err) {
    // Map service errors to appropriate HTTP statuses
    if (err.message === "User not found") {
      return res.status(404).json({ message: err.message });
    }

    if (err.message === "Invalid password") {
      return res.status(401).json({ message: err.message });
    }

    // Unknown error -> 500
    return res.status(500).json({ message: err.message });
  }
};

const register = (req, res) => {
  if (!req?.body?.email || !req?.body?.password || !req?.body?.firstName || !req?.body?.lastName) {
    return res.status(400).json({
      message: "Please provide email, password, firstName and lastName",
    });
  }

  const { db } = req.app;

  try {
    const result = UserService.register(req.body, db);
    return res.status(201).json(result);
  } catch (err) {
    if (err.message === "User already exists") {
      return res.status(409).json({ message: err.message });
    }

    return res.status(500).json({ message: err.message });
  }
};

const refreshToken = async (req, res) => {
  const { refreshToken } = req.body || {};

  if (!refreshToken) {
    return res.status(400).json({ message: "Please provide refreshToken" });
  }

  const { db } = req.app;

  try {
    const result = await UserService.refreshToken(refreshToken, db);
    return res.status(200).json(result);
  } catch (err) {
    if (err.message === "Invalid refresh token") {
      return res.status(401).json({ message: err.message });
    }

    if (err.message === "User not found") {
      return res.status(404).json({ message: err.message });
    }

    return res.status(500).json({ message: err.message });
  }
};

module.exports.UserController = { login, register, refreshToken };
