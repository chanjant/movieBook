const userDao = require("../modules/users-dao.js");

async function addUserToLocals(req, res, next) {
  const user = await userDao.retrieveUserWithAuthToken(req.cookies.authToken);
  res.locals.user = user;
  next();
}

function verifyAuthenticated(req, res, next) {
  if (res.locals.user) {
    next();
  } else {
    res.redirect("./login");
  }
}
/**
 * Jant: Allow users to access certain features on their own profile page or articles
 * @param {} req
 * @param {*} res
 * @param {*} next
 */
function verifyAccess(req, res, next) {
  if (res.locals.user && res.locals.user.user_id == req.query.user_id) {
    res.locals.authenticated = true;
  } else {
    res.locals.authenticated = false;
  }
  next();
}

module.exports = {
  addUserToLocals,
  verifyAuthenticated,
  verifyAccess,
};
