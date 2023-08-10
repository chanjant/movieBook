window.addEventListener("load", function () {
  let isEditing = false;
  const editProfileBtn = document.querySelector("#edit-profile-btn");
  const allEditBtn = document.querySelectorAll(".edit-btn");
  const fullviewAvatar = document.querySelector("#fullview-avatar");
  const thumbviewAvatar = document.querySelectorAll(".thumbview-avatar");
  const popupForms = document.querySelectorAll(".popup-form");
  const avatarForm = document.querySelector("#change-avatar-form");
  const allCancelBtn = document.querySelectorAll(".cancel-btn");
  const securedDiv = document.querySelectorAll(".secured");
  const changePwdBtn = document.querySelector("#change-pwd-btn");
  const changePwdForm = document.querySelector("#change-pwd-form");
  const deleteAccBtn = document.querySelector("#delete-acc-btn");
  const deleteAccForm = document.querySelector("#delete-acc-form");

  /**
   * Jant: edit buttons onclick eventlistener
   */
  editProfileBtn.addEventListener("click", function () {
    isEditing = !isEditing;
    editProfileBtn.innerText = isEditing ? "Done" : "Edit Profile";
    securedDiv.forEach((div) => {
      div.classList.toggle("hidden");
    });
    allEditBtn.forEach((btn) => {
      btn.classList.toggle("hidden");
      if (!isEditing) {
        const form = btn.parentElement.nextElementSibling;
        form.classList.add("hidden");
      }
    });
  });

  allEditBtn.forEach((btn) => {
    btn.addEventListener("click", function () {
      const form = event.target.parentElement.nextElementSibling;
      avatarForm.classList.add("hidden");
      popupForms.forEach((form) => {
        form.classList.add("hidden");
      });
      form.classList.toggle("hidden");
    });
  });

  allCancelBtn.forEach((btn) => {
    btn.addEventListener("click", function () {
      avatarForm.classList.add("hidden");
      popupForms.forEach((form) => {
        form.classList.add("hidden");
      });
    });
  });

  changePwdBtn.addEventListener("click", function () {
    popupForms.forEach((form) => {
      form.classList.add("hidden");
    });
    changePwdForm.classList.remove("hidden");
  });

  deleteAccBtn.addEventListener("click", function () {
    popupForms.forEach((form) => {
      form.classList.add("hidden");
    });
    deleteAccForm.classList.remove("hidden");
  });
  /**
   * Jant: Change fullview avatar according to clicked thumbview avatar
   */
  thumbviewAvatar.forEach((img) => {
    img.addEventListener("click", function () {
      fullviewAvatar.src = img.src;
    });
  });
});
