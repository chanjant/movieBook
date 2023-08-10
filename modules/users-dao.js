const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");
const { createHashPassword } = require("./salt-hash-password.js");

/**
 * Jant: Create user account and save password in hash & salt
 * @param {*} user
 * @param {*} password
 */
async function createUser(user, password) {
  const db = await dbPromise;
  const hashPassword = createHashPassword();
  const pwd = await hashPassword(password);
  //default: set is_admin as false
  const result = await db.run(SQL`
  INSERT INTO user 
  (username, fname, lname, salt, hash, birthday, description, is_admin, avatar) VALUES
  (${user.username}, ${user.fname}, ${user.lname},${pwd.salt}, ${pwd.hash},  date(${user.birthday}),${user.description}, false, ${user.avatar})`);
  user.user_id = result.lastID;
}

/**
 * Retrieve the users information
 * @param {string} username
 * @returns
 */
async function retrieveAllUsersInfo() {
  const db = await dbPromise;
  return await db.all(SQL`
  SELECT u.*, count(a.user_id) AS article_count 
  FROM article AS a 
  LEFT JOIN user AS u 
  ON u.user_id = a.user_id 
  GROUP BY u.user_id`);
}

async function retrieveUserByUsername(username) {
  const db = await dbPromise;
  return await db.get(SQL`
  SELECT * FROM user
  WHERE username = ${username}`);
}

async function retrieveUserByUserId(user_id) {
  const db = await dbPromise;
  return await db.get(SQL`
  SELECT * FROM user
  WHERE user_id = ${user_id}`);
}

async function retrieveUserWithAuthToken(authToken) {
  const db = await dbPromise;
  return await db.get(SQL`
  SELECT * from user
  WHERE authToken = ${authToken}`);
}
/**
 * Update users informations
 * @param {} user
 */
async function updateUser(user) {
  const db = await dbPromise;
  return await db.run(SQL`
  UPDATE user
  SET username = ${user.username}, fname = ${user.fname}, lname =${user.lname}, birthday = ${user.birthday}, description=${user.description}, avatar = ${user.avatar}, authToken = ${user.authToken}
  WHERE user_id = ${user.user_id}`);
}

async function updatePassword(user, password) {
  const db = await dbPromise;
  const hashPassword = createHashPassword();
  const pwd = await hashPassword(password);
  return await db.run(SQL`
  UPDATE user 
  SET salt=${pwd.salt}, hash = ${pwd.hash} 
  WHERE user_id = ${user.user_id}`);
}

/**
 * Delete user information
 * @param {*} userId
 * @returns
 */
async function deleteUserByUserId(user_id) {
  const db = await dbPromise;
  return await db.run(SQL`DELETE FROM user WHERE user_id = ${user_id}`);
}

module.exports = {
  createUser,
  retrieveAllUsersInfo,
  retrieveUserByUsername,
  retrieveUserByUserId,
  retrieveUserWithAuthToken,
  updateUser,
  updatePassword,
  deleteUserByUserId,
};
