const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

/**
 * Olivia: Retrieve articles popularity informations needed for analytics
 * dashboards
 * @param {*} user
 * @returns
 */
async function getCommentsCountByUserId(user_id) {
  const db = await dbPromise;
  return await db.get(SQL`
  SELECT a.user_id, count (c.comment_id) AS count
  FROM article AS a, comment AS c
  WHERE a.user_id = ${user_id} AND a.article_id = c.article_id;`);
}

async function getLikesCountByUserId(user_id) {
  const db = await dbPromise;
  return await db.get(SQL` 
  SELECT a.user_id, count (l.user_id) AS count
  FROM article AS a, likes AS l
  WHERE a.user_id = ${user_id}
  AND a.article_id = l.article_id;`);
}

//formula : comment number * 2 + likes number *1 = popularity
async function getPopularityByUserId(user_id) {
  const db = await dbPromise;
  return await db.all(SQL`
  SELECT a.article_id, a.title, a.timestamp, a.article_image, ifnull(C.countC,0) * 2 + ifnull(L.countL,0) AS Popularity, ifnull(C.countC,0) AS Comment_number, ifnull(L.countL,0) AS Like_number,
  RANK() OVER (ORDER BY ifnull(C.countC,0) * 2 + ifnull(L.countL,0) desc) AS ranking
  FROM article AS a
  LEFT JOIN (SELECT article_id, count(article_id) AS countC FROM comment
  GROUP BY article_id) as c ON (a.article_id = c.article_id)
  LEFT JOIN (SELECT article_id, count(article_id) AS countL FROM likes
  GROUP BY article_id) AS l ON (a.article_id = l.article_id)
  WHERE a.user_id=${user_id}
  ORDER BY Popularity DESC
  LIMIT 3;`);
}

async function getCommentNumberByDate(user_id, date) {
  const db = await dbPromise;
  const result = await db.get(SQL`
  SELECT date(comment_timeStamp) AS x, count(comment.comment_timeStamp) AS y
  FROM article LEFT JOIN comment 
  ON article.article_id = comment.article_id
  WHERE article.user_id = ${user_id} AND x = ${date}
  GROUP BY x`);
  if (result == null) {
    return JSON.parse(`{ "x": "${date}","y": 0 }`);
  } else {
    return result;
  }
}

module.exports = {
  getCommentsCountByUserId,
  getLikesCountByUserId,
  getPopularityByUserId,
  getCommentNumberByDate,
};
