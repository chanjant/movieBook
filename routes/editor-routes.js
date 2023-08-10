/**
 * This file consists of routers that perform publish, edit and delete
 * articles feature
 */

const express = require("express");
const router = express.Router();
const fs = require("fs");
const upload = require("../middleware/multer-uploader.js");
const userDao = require("../modules/users-dao.js");
const articlesDao = require("../modules/articles-dao.js");

/**
 * Olivia: publish articles & image
 */
router.post(
  "/publishArticle",
  upload.single("imageFile"),
  async function (req, res) {
    let newFileName;
    try {
      const fileInfo = req.file;
      // Move the upload image to article_images
      const oldFileName = fileInfo.path;
      newFileName = `./public/images/article_image/${fileInfo.originalname}`;
      fs.renameSync(oldFileName, newFileName);
    } catch {
      //user does not upload an image
      newFileName = null;
    }

    const timestamp = new Date().toLocaleString();

    const article = {
      title: req.body.title,
      content: req.body.content,
      timestamp: timestamp,
      article_image: newFileName,
    };
    //get user from authToken
    const user = await userDao.retrieveUserWithAuthToken(req.cookies.authToken);
    const result = await articlesDao.createArticle(article, user);
    const article_id = result.lastID;
    res.redirect(`/article?article_id=${article_id}`);
  }
);

/**
 * Jant: Update database on edited articles & images
 */
router.post(
  "/editArticle",
  upload.single("imageFile"),
  async function (req, res) {
    const article = await articlesDao.retrieveArticleByArticleId(
      req.query.article_id
    );
    let newFileName;
    try {
      const fileInfo = req.file;
      // Move the upload image to article_images
      const oldFileName = fileInfo.path;
      newFileName = `./public/images/article_image/${fileInfo.originalname}`;
      fs.renameSync(oldFileName, newFileName);
    } catch {
      //user does not upload an image
      newFileName = null;
    }
    if (newFileName) {
      article.article_image = newFileName;
    }
    article.title = req.body.title;
    article.content = req.body.content;
    try {
      await articlesDao.updateArticle(article);
    } catch (err) {
      res.setToastMessage("Error!");
    }
    res.redirect(`/article?article_id=${article.article_id}`);
  }
);

/**
 * Jant: update database if article image removed
 */
router.post("/deleteImage", async function (req, res) {
  const article = await articlesDao.retrieveArticleByArticleId(
    req.query.article_id
  );
  article.article_image = null;
  await articlesDao.updateArticle(article);
  res.redirect(req.get("referer"));
});

/**
 * Jant: Delete selected article
 */
router.post("/deleteArticle", async function (req, res) {
  try {
    await articlesDao.deleteArticle(req.query.article_id);
    res.setToastMessage("Article deleted!");
  } catch (err) {
    res.setToastMessage("Error!");
  }
  res.redirect("./");
});

module.exports = router;
