window.addEventListener("load", function () {
  /**
   * Jant: Subscribe and edit buttons on profile page
   */

  let userId;
  let authorId;
  let subscribedAuthor = [];
  const subscribeBtn = document.querySelector(".subscribe-btn");
  const subscribe = document.querySelector(".subscribe");
  const unsubscribe = document.querySelector(".unsubscribed");

  getLoginUserId();
  /**
   * Jant: Retrieve logged in user id
   */
  async function getLoginUserId() {
    console.log("here");
    const userResponse = await fetch("./loginUserId");
    userId = await userResponse.json();
    if (userId) {
      const subscribeResponse = await fetch(
        `./getSubscribedAuthor?author_id=${userId}`
      );
      const subscribeObject = await subscribeResponse.json();
      if (subscribeObject) {
        subscribeObject.forEach((obj) => {
          subscribedAuthor.push(obj.author_id);
        });
      }
      checkSubscribeStatus();
    }
  }

  /**
   * Jant: Identify author id for the article and check if user has subscribed to the author
   */
  function checkSubscribeStatus() {
    authorId = subscribeBtn.className.split("-").pop();
    if (authorId != userId) {
      const subscribed = subscribedAuthor.includes(parseInt(authorId));
      setSubscribeButton(authorId, subscribed);
    } else {
      enableEdit();
    }
  }

  /**
   * Jant: Allow user to edit if it's user's article
   */
  function enableEdit() {
    const button = document.querySelectorAll(`.edit-${userId}`);
    button.forEach((btn) => {
      btn.classList.remove("hidden");
    });
  }

  /**
   * Jant: show subscribe or unsubscribe button accordingly
   * @param {*} authorId
   * @param {*} subscribed
   */
  function setSubscribeButton(authorId, subscribed) {
    const button = document.querySelectorAll(`.subscribe-${authorId}`);
    button.forEach((btn) => {
      btn.classList.remove("hidden");
      const subscribe = btn.querySelector(".subscribe");
      const unsubscribe = btn.querySelector(".unsubscribed");
      if (subscribed == true) {
        unsubscribe.classList.remove("hidden");
        subscribe.classList.add("hidden");
      } else {
        subscribe.classList.remove("hidden");
        unsubscribe.classList.add("hidden");
      }
    });
  }

  /**
   * Jant: Responsive button that toggle between subscribe and unsubscribe
   */
  subscribeBtn.addEventListener("click", function () {
    subscribe.classList.toggle("hidden");
    unsubscribe.classList.toggle("hidden");
  });
});
