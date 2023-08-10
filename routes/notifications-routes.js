const express = require("express");
const router = express.Router();
const subscribeDao = require("../modules/subscribe-dao.js");

/**
 * Jill: Delete read notifications
 */
router.get("/delete-message", async (req, res) => {
  try {
    const result = await subscribeDao.deleteMessage(req.query.id);
    if (result) {
      res.json(true);
    } else {
      res.json(false);
    }
  } catch (error) {
    res.json(false);
  }
});

module.exports = router;
