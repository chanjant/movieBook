const express = require("express");
const router = express.Router();
const responseDao = require("../modules/response-dao.js");
//The route for like function
router.post("/article/switchLike", express.json(), async function (req, res) {
  const r = await responseDao.switchLike(req.body);
  res.send(JSON.stringify(r));
  res.end();
});

router.get("/article", express.json(), async function (req, res) {
  const { article_id, user_id } = req.query;
  if (!article_id) return res.redirect("/");

  const r = await responseDao.select(req.query);
  res.locals.title = r.data.title;
  if (r.code !== 200) return res.redirect("/");
  r.user_id = user_id;
  res.render("articles", r);
});
//The route for creat new comment.
router.post(
  "/article/createComment",
  express.json(),
  async function (req, res) {
    const r = await responseDao.createComment(req.body, res.locals.user);
    res.send(JSON.stringify(r));
    res.end();
  }
);
//The route for delete comment.
router.post("/article/delComment", express.json(), async function (req, res) {
  const r = await responseDao.delComment(req.body);
  res.send(JSON.stringify(r));
  res.end();
});


module.exports = router;
