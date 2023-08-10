window.addEventListener("load", function () {
  /**
   * Yvonne: comment and like features
   * @param {*} s
   * @param {*} all
   * @returns
   */
  const $ = function (s, all) {
    return document[all ? "querySelectorAll" : "querySelector"](s);
  };

  const query = {};
  location.search
    .replace("?", "")
    .split("&")
    .forEach(function (item) {
      item = item.split("=");
      query[item[0]] = item[1];
    });
  const user_id = query.user_id * 1;
  const article_id = query.article_id * 1;
  var show = false;
  if ($("#n-article-commentBtn")) {
    $("#n-article-commentBtn").onclick = function () {
      show = !show;
      $("#n-article-commentBtn").classList[show ? "add" : "remove"](
        "n-article-c"
      );
      $(".n-article-commentBox", 1).forEach(function (el) {
        el.style.display = show ? "" : "none";
      });
    };
  }

  const ajax = async function (opt) {
    const res = await fetch(opt.url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      ...opt,
    });
    return res.json();
  };

  if ($("#n-article-like")) {
    $("#n-article-like").onclick = async function (e) {
      if (!user_id) return (window.location.href = "/login");
      const el = e.target;
      const isLike = el.getAttribute("is-like") * 1;

      const res = await ajax({
        url: "/article/switchLike",
        body: JSON.stringify({ user_id, article_id, v: !isLike }),
      });
      if (res.code !== 200) return alert("Fail");
      el.setAttribute("is-like", isLike ? 0 : 1);
      const num = el.querySelector("em").innerText * 1;

      el.querySelector("em").innerText = isLike ? num - 1 : num + 1;
    };
  }

  window.delComment = async function (comment_id) {
    if (!user_id) return (window.location.href = "/login");
    const res = await ajax({
      url: "/article/delComment",
      body: JSON.stringify({ comment_id }),
    });
    if (res.code !== 200) return alert("Fail");
    alert("Successed");
    window.location.reload();
  };

  window.ncreateComment = async function () {
    if (!user_id) return (window.location.href = "/login");
    const input = $("#comment_content");

    const parent_id = input.getAttribute("parent_id") * 1 || 0;
    const res = await ajax({
      url: "/article/createComment",
      body: JSON.stringify({
        comment_content: input.value,
        user_id,
        article_id,
        parent_id,
      }),
    });
    if (res.code !== 200) return alert("Fail");
    alert("Successed");
    window.location.reload();
  };

  window.replyComment = function (parent_id, userName) {
    if (!user_id) return (window.location.href = "/login");
    const input = $("#comment_content");
    input.setAttribute("parent_id", parent_id);
    input.value = `[Reply ${userName}]: `;
    input.focus();
  };
});
