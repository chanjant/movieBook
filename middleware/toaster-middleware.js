let alert = require("alert");

/**
 * Jill: Alert users when there is toast message
 * @param {} req
 * @param {*} res
 * @param {*} next
 */
function toaster(req, res, next) {
  res.locals.toastMessage = req.cookies.toastMessage;
  res.clearCookie("toastMessage");
  res.setToastMessage = function (message) {
    res.cookie("toastMessage", message);
    alert(message);
  };
  next();
}

module.exports = toaster;
