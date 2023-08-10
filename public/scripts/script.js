/**
 * Jill: Direct users to relevant page of the notification message and delete the message after clicked
 * @param {*} e
 * @param {*} id
 */
function locationHref(e, id) {
  fetch("/delete-message/?id=" + id).then((res) => {
    location.href = e;
  });
}
