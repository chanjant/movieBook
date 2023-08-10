const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

async function createArticle(article, user) {
  const db = await dbPromise;
  const result = await db.run(SQL`
  INSERT INTO article (user_id,title,content,timestamp,article_image) 
  VALUES (${user.user_id},${article.title}, ${article.content}, ${article.timestamp},${article.article_image})`);
  article.id = result.lastID;
  const follow = await db.all(SQL`
  SELECT * FROM subscribe WHERE author_id=${user.user_id}`);
  for (let i = 0; i < follow.length; i++) {
    const element = follow[i];
    const user_id = element.subscriber_id;
    const avatar = user.avatar;
    const target_id = result.lastID;
    const title = `${user.username} published an article "${article.title}"`;
    const time = new Date();
    const href = `/article?user_id=${user_id}&article_id=${target_id}`;
    let res = await db.run(SQL`
    INSERT INTO messages(user_id,target_id,avatar,title,create_time,href) VALUES(${user_id},${target_id},${avatar},${title},${time},${href})
    `);
  }
  return result;
}

/**
 * Jant: Retrieve all users articles by user id sorted by date
 * @param {*} user_id
 * @returns
 */
async function retrieveUserArticleByUserId(user_id) {
  const db = await dbPromise;
  return await db.all(SQL`
  SELECT u.fname, u.lname, u.username, u.avatar, a.* 
  FROM user AS u, article AS a 
  WHERE u.user_id = ${user_id} AND a.user_id = ${user_id}
  ORDER BY a.timestamp DESC`);
}

/**
 * Yvonne: Retrieve all articles sorted by username, title and date;
 * @returns
 */
async function retrieveAllArticleSortedByUsername() {
  const db = await dbPromise;
  return await db.all(SQL`
  SELECT u.fname, u.lname, u.username, u.avatar, a.* 
  FROM user as u, article AS a
  WHERE u.user_id = a.user_id
  ORDER BY u.username ASC`);
}

async function retrieveAllArticleSortedByTitle() {
  const db = await dbPromise;
  return await db.all(SQL`
  SELECT u.fname, u.lname, u.avatar,u.username, a.* 
  FROM user as u, article AS a
  WHERE u.user_id = a.user_id
  ORDER BY a.title ASC`);
}

async function retrieveAllArticleSortedByTime() {
  const db = await dbPromise;
  return await db.all(SQL`
  SELECT u.fname, u.lname, u.avatar,u.username, a.* 
  FROM user as u, article AS a
  WHERE u.user_id = a.user_id
  ORDER BY a.timestamp DESC`);
}

/**
 * Retrieve specific article by article id
 * @param {*} article_id
 * @returns
 */
async function retrieveArticleByArticleId(article_id) {
  const db = await dbPromise;
  return await db.get(SQL`
  SELECT * from article WHERE article_id = ${article_id}`);
}

/**
 * Jant: Update & delete article
 * @param {*} article
 */
async function updateArticle(article) {
  const db = await dbPromise;
  await db.run(SQL`
  UPDATE article SET title = ${article.title}, content=${article.content}, article_image=${article.article_image} 
  WHERE article_id = ${article.article_id}`);
}

async function deleteArticle(article_id) {
  const db = await dbPromise;
  return await db.run(
    SQL`DELETE FROM article WHERE article_id = ${article_id}`
  );
}
module.exports = {
  createArticle,
  retrieveUserArticleByUserId,
  retrieveAllArticleSortedByUsername,
  retrieveAllArticleSortedByTitle,
  retrieveAllArticleSortedByTime,
  retrieveArticleByArticleId,
  updateArticle,
  deleteArticle,
};
