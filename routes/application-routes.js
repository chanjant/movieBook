/**
 * This file consists of get routers that render handlebars including
 * homepage, profile page, article page, publish page, edit page and analytics page
 */

const express = require("express");
const router = express.Router();
const { verifyAuthenticated } = require("../middleware/auth-middleware.js");
const { verifyAccess } = require("../middleware/auth-middleware.js");
const userDao = require("../modules/users-dao.js");
const articlesDao = require("../modules/articles-dao.js");
const subscribeDao = require("../modules/subscribe-dao");

/**
 * Render homepage
 * Yvonne: Retrieve all articles by selected order type
 */
router.get("/", async function (req, res) {
  const order = req.query.query;
  res.locals.dateOrder = false;
  res.locals.titleOrder = false;
  res.locals.usernameOrder = false;
  let articles;
  if (order == "username") {
    articles = await articlesDao.retrieveAllArticleSortedByUsername();
    res.locals.usernameOrder = true;
  } else if (order == "title") {
    articles = await articlesDao.retrieveAllArticleSortedByTitle();
    res.locals.titleOrder = true;
  } else {
    articles = await articlesDao.retrieveAllArticleSortedByTime();
    res.locals.dateOrder = true;
  }
  res.locals.articles = articles;
  res.locals.title = "Home";
  res.render("home");
});

/**
 * Jant: render profile page
 * Jill: show followers and following counts in profile
 */
router.get("/profile", verifyAccess, async function (req, res) {
  const userId = req.query.user_id;
  const userProfile = await userDao.retrieveUserByUserId(userId);
  const userArticle = await articlesDao.retrieveUserArticleByUserId(userId);
  res.locals.title = `Profile - ${userProfile.username}`;
  res.locals.profile = userProfile;
  res.locals.articles = userArticle;
  res.locals.following = await subscribeDao.getFollowingCountByUserId(userId);
  res.locals.followers = await subscribeDao.getSubscribersCountByUserId(userId);
  res.render("profile");
});

/**
 * Olivia: render editor and set editor form to be posted to ./publishArticle
 */
router.get("/publishArticle", verifyAuthenticated, async function (req, res) {
  res.locals.editor = {
    id: "publishArticleForm",
    url: "./publishArticle",
  };
  res.locals.title = "Publish";
  res.render("editor");
});

/**
 * Jant: render editor and set editor form to be posted to ./editArticle
 */
router.get("/editArticle", async function (req, res) {
  const articleId = req.query.article_id;
  const editing = await articlesDao.retrieveArticleByArticleId(articleId);
  res.locals.editing = editing;
  res.locals.editor = {
    id: "editArticleForm",
    url: `./editArticle?article_id=${articleId}`,
  };
  res.locals.title = `Edit - ${editing.title}`;
  res.render("editor");
});
/**
 * Yvonne: render full view article page
 */
router.get("/articles", async function (req, res) {
  res.render("articles");
});

/**
 * Jant: render admin page;
 */
router.get(
  "/admin",
  verifyAuthenticated,
  verifyAccess,
  async function (req, res) {
    if (res.locals.authenticated) {
      const userId = req.query.user_id;
      res.locals.subscribers = await subscribeDao.retrieveAllSubscribers(
        userId
      );
      res.locals.subscribing = await subscribeDao.retrieveAllSubscribing(
        userId
      );
      res.locals.title = `Admin - ${res.locals.user.username}`;
      res.render("admin");
    } else {
      res.redirect("./");
    }
  }
);

module.exports = router;
