/**
 * This file consists of routers that allow users to edit account informations
 */

const express = require("express");
const router = express.Router();
const userDao = require("../modules/users-dao.js");
const { verifyAccess } = require("../middleware/auth-middleware.js");
const { verifyAuthenticated } = require("../middleware/auth-middleware.js");

/**
 * Jant: Update database on changes in user informations
 */
router.post(
  "/changeAvatar",
  verifyAuthenticated,
  verifyAccess,
  async function (req, res) {
    if (res.locals.authenticated) {
      const user = res.locals.user;
      user.avatar = req.body.avatar;
      await userDao.updateUser(user);
      res.setToastMessage("Saved!");
    } else {
      res.setToastMessage("Error!");
    }
    res.redirect(req.get("referer"));
  }
);

router.post(
  "/changeName",
  verifyAuthenticated,
  verifyAccess,
  async function (req, res) {
    if (res.locals.authenticated) {
      const user = res.locals.user;
      user.fname = req.body.fname;
      user.lname = req.body.lname;
      await userDao.updateUser(user);
      res.setToastMessage("Saved!");
    } else {
      res.setToastMessage("Error!");
    }
    res.redirect(req.get("referer"));
  }
);

router.post(
  "/changeUsername",
  verifyAuthenticated,
  verifyAccess,
  async function (req, res) {
    if (res.locals.authenticated) {
      const user = res.locals.user;
      user.username = req.body.username;
      await userDao.updateUser(user);
      res.setToastMessage("Saved!");
    } else {
      res.setToastMessage("Error!");
    }
    res.redirect(req.get("referer"));
  }
);

router.post(
  "/changeBirthday",
  verifyAuthenticated,
  verifyAccess,
  async function (req, res) {
    if (res.locals.authenticated) {
      const user = res.locals.user;
      user.birthday = req.body.birthday;
      await userDao.updateUser(user);
      res.setToastMessage("Saved!");
    } else {
      res.setToastMessage("Error!");
    }
    res.redirect(req.get("referer"));
  }
);

router.post(
  "/changeDescription",
  verifyAuthenticated,
  verifyAccess,
  async function (req, res) {
    if (res.locals.authenticated) {
      const user = res.locals.user;
      user.description = req.body.description;
      await userDao.updateUser(user);
      res.setToastMessage("Saved!");
    } else {
      res.setToastMessage("Error!");
    }
    res.redirect(req.get("referer"));
  }
);

router.post(
  "/changePwd",
  verifyAuthenticated,
  verifyAccess,
  async function (req, res) {
    if (res.locals.authenticated) {
      const user = res.locals.user;
      await userDao.updatePassword(user, req.body.password);
      res.setToastMessage("Password changed!");
      res.setToastMessage("Saved!");
    } else {
      res.setToastMessage("Error!");
    }
    res.redirect(req.get("referer"));
  }
);

module.exports = router;
