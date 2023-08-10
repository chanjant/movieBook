const subscribeDao = require("../modules/subscribe-dao");

/**
 * Jill: Add notifications message to locals for every pages to render
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function addMessageToLocals(req, res, next) {
  res.locals.message = await subscribeDao.getMessage(res.locals.user);
  next();
}

module.exports = {
  addMessageToLocals,
};
