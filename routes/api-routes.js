/**
 * This file consists of api routers
 */
const { v4: uuid } = require("uuid");
const express = require("express");
const router = express.Router();
const userDao = require("../modules/users-dao.js");
const { isPasswordCorrect } = require("../modules/salt-hash-password.js");
/**
 * Jant: Get username and password submitted and find matching user in database
 * update authToken when logged in
 */
router.post("/api/login", async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const user = await userDao.retrieveUserByUsername(username);
  let result;
  try {
    result = await isPasswordCorrect(user.hash, user.salt, password);
    if (result) {
      const authToken = uuid();
      user.authToken = authToken;
      await userDao.updateUser(user);
      res.cookie("authToken", authToken);
      res.locals.user = user;
      res.status(204);
    } else {
      res.setToastMessage("Wrong password!");
    }
  } catch (err) {
    res.setToastMessage("Wrong username!");
  }
  if (!user || !result) {
    res.locals.user = null;
    res.status(401);
  }
  res.redirect(req.get("referer"));
});

/**
 * Jant: Clear authToken when logout and set status code to 204
 */
router.get("/api/logout", async function (req, res) {
  const user = res.locals.user;
  user.authToken = null;
  await userDao.updateUser(user);
  res.clearCookie("authToken");
  res.locals.user = null;
  res.setToastMessage("Successfully logged out!");
  res.status(204);
  res.redirect(req.get("referer"));
});

/**
 * Jant: Return all users info in JSON
 * Allow admin to access only
 */
router.get("/api/users", async function (req, res) {
  const user = res.locals.user;
  if (user.is_admin) {
    const users = await userDao.retrieveAllUsersInfo();
    res.json(users);
  } else {
    res.status(401);
    res.end();
  }
});

/**
 * Jant: allow access to admin only
 * Delete user by params id
 */
router.delete("/api/users/:id", async function (req, res) {
  const user = res.locals.user;
  if (!user || !user.is_admin) {
    res.status(401);
  } else if (user.is_admin) {
    const userId = req.params["id"];
    await userDao.deleteUserByUserId(userId);
    res.status(204);
  }
  res.end();
});

module.exports = router;
