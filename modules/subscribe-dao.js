const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

/**
 * Jill: add subscribe relationship to database and add to message table about
 * subscription details to notify subscribers
 * @param {} author_id
 * @param {*} subscriber_id
 * @param {*} user
 */
async function subscribe(author, subscriber) {
  const db = await dbPromise;
  const authorId = author.user_id;
  const subscriberId = subscriber.user_id;
  const result = await db.run(SQL`
  INSERT INTO subscribe(author_id,subscriber_id) VALUES
  (${authorId},${subscriberId})`);
  const avatar = subscriber.avatar;
  const time = new Date();
  const href = `/profile?user_id=${subscriberId}`;
  //message for author
  let title = `${subscriber.username} is now following you`;
  await db.run(SQL`
    INSERT INTO messages(user_id, target_id, avatar,title,create_time,href) VALUES (${authorId},${subscriberId},${avatar},${title},${time},${href})`);
  //message for author's subscriber
  title = `${subscriber.username} is now following ${author.username}`;
  const followers = await db.all(SQL`
  SELECT * FROM subscribe WHERE author_id=${authorId}`);
  for (let i = 0; i < followers.length; i++) {
    const receiverId = followers[i].subscriber_id;
    if (receiverId != subscriberId) {
      await db.run(SQL`
    INSERT INTO messages(user_id,target_id, avatar,title,create_time,href) VALUES 
    (${receiverId},${subscriberId},${avatar},${title},${time},${href})`);
    }
  }
}

/**
 * Jill: Delete subscribe relationship when user unsubscribe
 * @param {*} author_id
 * @param {*} subscriber_id
 * @returns
 */
async function unsubscribe(author_id, subscriber_id) {
  const db = await dbPromise;
  return await db.run(SQL`DELETE FROM subscribe
  WHERE author_id=${author_id} AND subscriber_id=${subscriber_id}`);
}

/**
 * Jill: check following status
 * @param {*} author_id
 * @param {*} subscriber_id
 * @returns
 */
async function checkFollowing(author_id, subscriber_id) {
  const db = await dbPromise;
  return await db.get(SQL`SELECT * FROM subscribe  
  WHERE  author_id=${author_id} and subscriber_id=${subscriber_id}`);
}

/**
 * Jill: retrieve notifications messages
 * @param {*} user
 * @returns
 */
async function getMessage(user) {
  if (!user) return [];
  const db = await dbPromise;
  const result = await db.all(SQL`SELECT * FROM messages  
  WHERE user_id=${user.user_id}`);
  const data = result.map((e) => {
    let date = new Date(Number(e.create_time));
    Y = date.getFullYear() + "-";
    M =
      (date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) + "-";
    D = date.getDate() + " ";
    h = date.getHours() + ":";
    m = date.getMinutes() + ":";
    s = date.getSeconds();
    e.create_time = Y + M + D + h + m + s;
    e.href = String(e.href);
    return e;
  });
  return data;
}

/**
 * Jill: Delete notifications message
 * @param {*} id
 * @returns
 */
async function deleteMessage(id) {
  const db = await dbPromise;
  const result = await db.run(SQL`delete from messages where id=${id}`);
  return result;
}

/**
 * Jant: Retrieve informations from subscribe table
 * @param {*} user_id
 * @returns
 */
async function retrieveSubscribedAuthorListByUserId(user_id) {
  const db = await dbPromise;
  return (result = await db.all(SQL`
  SELECT author_id FROM subscribe WHERE subscriber_id = ${user_id}`));
}

async function retrieveAllSubscribers(user_id) {
  const db = await dbPromise;
  return await db.all(SQL`
  SELECT s.subscriber_id, u.fname, u.lname, u.username, u.avatar 
  FROM subscribe AS s, user AS u
  WHERE author_id = ${user_id} AND s.subscriber_id = u.user_id
  ORDER BY u.username ASC`);
}

async function retrieveAllSubscribing(user_id) {
  const db = await dbPromise;
  return await db.all(SQL`
  SELECT s.author_id , u.fname, u.lname, u.username, u.avatar
  FROM subscribe AS s, user AS u
  WHERE subscriber_id = ${user_id} AND s.author_id = u.user_id
  ORDER BY u.username ASC`);
}

async function removeSubscriber(user_id, subscriber_id) {
  const db = await dbPromise;
  return await db.run(SQL`
  DELETE FROM subscribe WHERE author_id = ${user_id} AND subscriber_id = ${subscriber_id}`);
}

/**
 * Jill: Get following and followers count by user id
 * @param {*} user_id
 * @returns
 */

async function getSubscribersCountByUserId(user_id) {
  const db = await dbPromise;
  return await db.get(SQL`
  SELECT author_id as id, count(subscriber_id) as count 
  FROM subscribe
  WHERE author_id = ${user_id}`);
}
async function getFollowingCountByUserId(user_id) {
  const db = await dbPromise;
  return await db.get(SQL`
  SELECT count(*) AS count FROM subscribe WHERE subscriber_id = ${user_id}`);
}

module.exports = {
  subscribe,
  unsubscribe,
  checkFollowing,
  getMessage,
  deleteMessage,
  retrieveSubscribedAuthorListByUserId,
  retrieveAllSubscribers,
  retrieveAllSubscribing,
  removeSubscriber,
  getSubscribersCountByUserId,
  getFollowingCountByUserId,
};
