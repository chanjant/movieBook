/**
 * This file consists of routers to perform analytics dashboard functions
 */
const express = require("express");
const router = express.Router();
const { verifyAuthenticated } = require("../middleware/auth-middleware.js");
const userDao = require("../modules/users-dao.js");
const subscribeDao = require("../modules/subscribe-dao.js");
const analyticsDao = require("../modules/analytics-dao.js");

router.get("/analytics", verifyAuthenticated, async function (req, res) {
  res.locals.title = `Analytics dashboard`;
  const user = await userDao.retrieveUserWithAuthToken(req.cookies.authToken);
  const userId = user.user_id;
  //key metrics
  //count subscribers
  const subscribers = await subscribeDao.getSubscribersCountByUserId(userId);

  //count comments
  const comments = await analyticsDao.getCommentsCountByUserId(userId);

  //count likes
  const likes = await analyticsDao.getLikesCountByUserId(userId);

  //popularity
  const popularity = await analyticsDao.getPopularityByUserId(userId);
  res.locals.user = user;
  res.locals.numSubscribers = subscribers.count;
  res.locals.numComments = comments.count;
  res.locals.numLikes = likes.count;
  res.locals.popularity = popularity;
  res.render("analytics");
});

 //create a new route to receive the data
router.get("/commentTrend", verifyAuthenticated, async function (req, res) {
  const userId = res.locals.user.user_id;
  const data = [];

  for (let i = 0; i < 10; i++) {
    let date = new Date();
    date.setDate(date.getDate() - i);
    let targetDate = date.toLocaleDateString("sv-SE");
    const result = await analyticsDao.getCommentNumberByDate(
      userId,
      targetDate
    );
    data.push(result);
  }
  res.json(data);
});

module.exports = router;
