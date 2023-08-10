window.addEventListener("load", function () {
  const username = document.querySelector("#txtUsername");
  const usernameIcon = document.querySelector("#usernameIcon");
  const pwd = document.querySelector("#txtPassword");
  const confirmPwd = document.querySelector("#txtConfirmPassword");
  const pwdIcon = document.querySelector("#passwordIcon");
  const verifyBtn = document.querySelectorAll(".verifyBtn");

  let correctPwd = true;
  let validUsername = true;

  /**
   * Jant: event listeners on username and password input
   */
  confirmPwd.addEventListener("click", setCorrectPwd);
  username.addEventListener("click", setValidUsername);
  pwd.addEventListener("keyup", checkPassword);
  confirmPwd.addEventListener("keyup", checkPassword);
  username.addEventListener("keyup", async function () {
    username.removeEventListener("click", setValidUsername);
    let response = await fetch(
      `./checkUsernameAvailability?username=${username.value}`
    );
    let availability = await response.json();
    if (availability && username.value) {
      usernameIcon.src = "./images/tick.png";
      validUsername = true;
    } else {
      usernameIcon.src = "./images/cross.png";
      validUsername = false;
    }
    checkButtonStatus();
  });

  /**
   * Jant: Check if two password entered are matched
   */
  function checkPassword() {
    if (!pwd.value || !confirmPwd.value) {
      correctPwd = false;
      pwdIcon.src = "";
    } else if (pwd.value === confirmPwd.value) {
      pwdIcon.src = "./images/tick.png";
      correctPwd = true;
    } else {
      pwdIcon.src = "./images/cross.png";
      correctPwd = false;
    }
    checkButtonStatus();
  }

  function setCorrectPwd() {
    correctPwd = false;
  }
  function setValidUsername() {
    validUsername = false;
  }

  /**
   * Jant: Disable button if username is taken or password entered doesn't match
   */
  function checkButtonStatus() {
    if (!correctPwd || !validUsername) {
      verifyBtn.forEach((button) => {
        button.disabled = true;
      });
    } else {
      verifyBtn.forEach((button) => {
        button.disabled = false;
      });
    }
  }
});
