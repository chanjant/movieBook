/**
 * This file consists of routers for subscription features
 */
const express = require("express");
const router = express.Router();
const subscribeDao = require("../modules/subscribe-dao.js");
const userDao = require("../modules/users-dao.js");

/**
 * Jill: Check users subscribing status and subscribe or unsubscribe
 * accordingly
 */
router.get("/subscribe", async function (req, res) {
  const authorId = req.query.author_id;
  const author = await userDao.retrieveUserByUserId(authorId);
  const user = res.locals.user;
  const userId = user.user_id;
  const following = await subscribeDao.checkFollowing(authorId, userId);
  if (following) {
    //unsubscribe if users have already subscribe to the author
    await subscribeDao.unsubscribe(authorId, userId);
    res.setToastMessage("Unfollow successfully!");
  } else {
    //subscribe if haven't already
    await subscribeDao.subscribe(author, user);
    res.setToastMessage("Follow successfully!");
  }
  res.redirect(req.get("referer"));
});

/**
 * Jant: Retrieve all authors subscribed by the user
 */
router.get("/getSubscribedAuthor", async function (req, res) {
  const result = await subscribeDao.retrieveSubscribedAuthorListByUserId(
    req.query.author_id
  );
  return res.json(result);
});

/**
 * Jant: Allow users to remove subscribers from admin page
 */
router.get("/removeSubscriber", async function (req, res) {
  const userId = res.locals.user.user_id;
  const subscriberId = req.query.subscriber_id;
  await subscribeDao.removeSubscriber(userId, subscriberId);
  res.redirect(req.get("referer"));
});

module.exports = router;
