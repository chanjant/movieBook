const crypto = require("crypto");
const { promisify } = require("util");
const pbkdf2 = promisify(crypto.pbkdf2);

/**
 * Jant: Create and store hash and salt password
 * @returns
 */
function createHashPassword() {
  return async function hashPassword(password) {
    const salt = crypto.randomBytes(10).toString("base64");
    const hashBuffer = await pbkdf2(password, salt, 10, 10, "sha512");
    const hash = hashBuffer.toString("hex");
    return { hash, salt };
  };
}

/**
 * Jant: check if the password entered matched with the database's
 * @param {*} hashPassword
 * @param {*} saltPassword
 * @param {*} passwordAttempt
 * @returns
 */
async function isPasswordCorrect(hashPassword, saltPassword, passwordAttempt) {
  const hashBuffer = await pbkdf2(
    passwordAttempt,
    saltPassword,
    10,
    10,
    "sha512"
  );
  const hashAttempt = hashBuffer.toString("hex");
  return hashPassword == hashAttempt;
}

module.exports = {
  createHashPassword,
  isPasswordCorrect,
};
