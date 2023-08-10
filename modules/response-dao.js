const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");
/*
Get the basic data of the article.
*/
async function select(body) {
  const db = await dbPromise;
  const { article_id, user_id } = body;
  const data = await db.get(SQL`
  SELECT article.*, user.username, user.fname, user.lname, user.avatar 
  FROM article LEFT JOIN user ON article.user_id = user.user_id 
  WHERE article_id = ${article_id}`);
  const commentTotal = await db.get(SQL`
  SELECT count(*) FROM comment WHERE  article_id = ${article_id} `);
  const likeTotal = await db.get(SQL`
  SELECT count(*) FROM likes WHERE  article_id = ${article_id} `);
  const isLike = await db.get(SQL`
  SELECT * FROM likes WHERE  user_id = ${user_id} AND article_id = ${article_id} `);
  let commentList = await db.all(SQL`
  SELECT comment.*, user.username, user.fname, user.lname, user.avatar 
  FROM comment LEFT JOIN user on comment.user_id = user.user_id 
  WHERE  article_id = ${article_id}`);

/*
Convert array data to tree data.
*/
  if (!data || !commentTotal || !likeTotal || !commentList) return { code: 0 };
  const commentMap = {};
  while (commentList.length) {
    const v = commentList.shift();
    const def = commentMap[v.comment_id];
    commentMap[v.comment_id] = v;
    v.child = (def && def.child) || [];
    v.comment_timeStamp = new Date(v.comment_timeStamp).toLocaleString();
    if (!v.parent_id) continue;
    const parent = commentMap[v.parent_id] || { child: [] };
    parent.child.push(v);
  }
  Object.values(commentMap).forEach(function (v) {
    v.isDel = v.user_id == user_id || user_id == data.user_id;
	v.isRenderChild = v.child.length;
    if (v.parent_id) return;
    commentList.push(v);
  });

  return {
    code: 200,
    data,
    commentList,
    isLike: isLike ? 1 : 0,
    commentNoData: !commentList.length,
    commentTotal: commentTotal["count(*)"],
    likeTotal: likeTotal["count(*)"],
  };
}

async function createComment(body, user) {
  const db = await dbPromise;
  const { comment_content, user_id, article_id, parent_id = 0 } = body;
  const comment_timeStamp = new Date().toJSON();
  const res = await db.run(SQL`
  INSERT INTO comment (comment_content,user_id,article_id,parent_id,comment_timeStamp) VALUES 
  (${comment_content},${user_id},${article_id},${parent_id},${comment_timeStamp})`);

  const follow = await db.all(SQL`
  SELECT * FROM subscribe WHERE author_id=${user_id}`);

  for (let i = 0; i < follow.length; i++) {
    const element = follow[i];
    const user_id = element.subscriber_id;
    const avatar = user.avatar;
    const target_id = article_id;
    const title = `${user.username} leaves a comment: "${comment_content}"`;
    const time = new Date();
    const href = `/article?user_id=${user_id}&article_id=${target_id}`;
    let res = await db.run(SQL`
    INSERT INTO messages(user_id,target_id,avatar,title,create_time,href) VALUES (${user_id},${target_id},${avatar},${title},${time},${href})`);
  }
  return { code: res ? 200 : 0 };
}

async function delComment(body) {
  const db = await dbPromise;
  const { comment_id } = body;
  const res1 = await db.run(SQL`
  DELETE FROM comment WHERE comment_id = ${comment_id}`);
  const res2 = await db.run(SQL`
  UPDATE comment SET parent_id = 0 WHERE parent_id = ${comment_id} `);
  return { code: res1 && res2 ? 200 : 0 };
}

async function switchLike(body) {
  const db = await dbPromise;
  const { v, user_id, article_id } = body;
  if (!user_id || !article_id) return { code: 0 };
  const isExis = await db.get(SQL`
  SELECT * FROM likes WHERE  user_id = ${user_id} AND article_id = ${article_id}`);
  if (v && !isExis)
    await db.run(SQL`
    INSERT INTO likes (user_id,article_id) VALUES (${user_id}, ${article_id}) `);

  if (!v && isExis)
    await db.run(SQL`
    DELETE FROM likes WHERE user_id = ${user_id} AND article_id = ${article_id} `);

  return { code: 200 };
}

module.exports = {
  select,
  createComment,
  delComment,
  switchLike,
};
