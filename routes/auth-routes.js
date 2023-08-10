/**
 * This file consists of routers that render login, logout page;
 * Allow users to create and delete account
 */
const express = require("express");
const router = express.Router();
const userDao = require("../modules/users-dao.js");
const { verifyAuthenticated } = require("../middleware/auth-middleware.js");
const { verifyAccess } = require("../middleware/auth-middleware.js");
/**
 * Jant: Redirect to homepage if logged in or render longin if haven't
 */
router.get("/login", async function (req, res) {
  if (res.locals.user) {
    res.redirect("/");
  } else {
    res.render("login");
  }
});

/**
 * Jant: Account creation
 */
router.get("/register", async function (req, res) {
  res.locals.title = "Final Project - Register";
  res.render("register");
});

router.post("/newAccount", async function (req, res) {
  const user = {
    username: req.body.username,
    fname: req.body.fname,
    lname: req.body.lname,
    avatar: req.body.avatar,
    birthday: req.body.birthday,
    is_admin: false,
    description: req.body.description,
  };
  try {
    await userDao.createUser(user, req.body.password);
    res.setToastMessage(
      "Account creation successful. Please login using your new credentials."
    );
    res.redirect("./login");
  } catch (err) {
    res.setToastMessage("That username was already taken!");
    res.redirect("./register");
  }
});

/**
 * Jant: Allow users to delete account
 */
router.post(
  "/deleteAccount",
  verifyAuthenticated,
  verifyAccess,
  async function (req, res) {
    if (res.locals.authenticated) {
      try {
        await userDao.deleteUserByUserId(res.locals.user.user_id);
        res.setToastMessage("Account deleted!");
      } catch (err) {
        res.setToastMessage("Error!");
      }
    }
    res.redirect("./");
  }
);
/**
 * Jant: check username availability and return json back to register.js event listener
 */
router.get("/checkUsernameAvailability", async function (req, res) {
  try {
    const result = await userDao.retrieveUserByUsername(req.query.username);
    if (result) {
      res.json(false);
    } else {
      res.json(true);
    }
  } catch (err) {
    console.log("Retrieve user failed.");
  }
});

/**
 * Jant: return user ID to script.js getLoginUserId()
 */
router.get("/loginUserId", function (req, res) {
  if (res.locals.user) {
    return res.json(res.locals.user.user_id);
  } else {
    return res.json(null);
  }
});

module.exports = router;
