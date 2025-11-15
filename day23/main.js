const inputsEl = document.querySelectorAll("input");
const btnEl = document.querySelector("button");
const labelEl = document.querySelectorAll("label");
const errorInfo = document.querySelectorAll("h4");
const noticeEl = document.querySelectorAll(".notice");
const checkBlank = () => {
  for (let index = 0; index < inputsEl.length; index++) {
    const noticeCheck = "notice";
    if (!inputsEl[index].value) {
      errorInfo[index].className = "block";
      inputsEl[index].className = "border-red-400";
      noticeEl[index].className = noticeCheck + " " + "block";
    }
  }
};
btnEl.addEventListener("click", checkBlank);

const usernameEl = document.querySelector(".username");
const emailEl = document.querySelector(".email");
const passwordEl = document.querySelector(".password");
const passwordConfirmEl = document.querySelector(".password-confirm");
const validate = (classEl) => {
  classEl.addEventListener("click", () => {
    const inputEl = classEl.querySelector("input");
    const error = classEl.querySelector("h4");
    const checkEl = classEl.querySelector(".check");
    const noticeEl = classEl.querySelector(".notice");
    inputEl.addEventListener("input", () => {
      const iconCheck = "check";
      const noticeCheck = "notice";
      if (inputEl.value) {
        error.className = "hidden";
        inputEl.className = "border-gray-300";
        noticeEl.className = noticeCheck + " " + "hidden";
        checkEl.className = iconCheck + " " + "block";
      } else {
        error.className = "block";
        inputEl.className = "border-red-400";
        noticeEl.className = noticeCheck + " " + "block";
        checkEl.className = iconCheck + " " + "hidden";
      }
    });
  });
};
validate(usernameEl);
validate(passwordEl);
emailEl.addEventListener("click", () => {
  const inputEl = emailEl.querySelector("input");
  const error = emailEl.querySelector("h4");
  const checkEl = emailEl.querySelector(".check");
  const noticeEl = emailEl.querySelector(".notice");
  inputEl.addEventListener("input", () => {
    const iconCheck = "check";
    const noticeCheck = "notice";
    if (!inputEl.value.toString().includes("@")) {
      error.className = "block";
      inputEl.className = "border-red-400";
      noticeEl.className = noticeCheck + " " + "block";
      checkEl.className = iconCheck + " " + "hidden";
    } else if (inputEl.value) {
      error.className = "hidden";
      inputEl.className = "border-gray-300";
      noticeEl.className = noticeCheck + " " + "hidden";
      checkEl.className = iconCheck + " " + "block";
    } else {
      error.className = "block";
      inputEl.className = "border-red-400";
      noticeEl.className = noticeCheck + " " + "block";
      checkEl.className = iconCheck + " " + "hidden";
    }
  });
});

passwordConfirmEl.addEventListener("click", () => {
  const inputEl = passwordConfirmEl.querySelector("input");
  const error = passwordConfirmEl.querySelector("h4");
  const contentPassword = document.querySelector(".password input");
  const checkEl = passwordConfirmEl.querySelector(".check");
  const noticeEl = passwordConfirmEl.querySelector(".notice");
  inputEl.addEventListener("input", () => {
    const iconCheck = "check";
    const noticeCheck = "notice";
    if (!inputEl.value) {
      error.innerText = "Password Confirmation required";
      error.className = "block";
      inputEl.className = "border-red-400";
      noticeEl.className = noticeCheck + " " + "block";
      checkEl.className = iconCheck + " " + "hidden";
    } else if (inputEl.value === contentPassword.value) {
      error.className = "hidden";
      inputEl.className = "border-gray-300";
      noticeEl.className = noticeCheck + " " + "hidden";
      checkEl.className = iconCheck + " " + "block";
    } else {
      error.innerText = "Password does not match";
      error.className = "block";
      inputEl.className = "border-red-400";
      noticeEl.className = noticeCheck + " " + "block";
      checkEl.className = iconCheck + " " + "hidden";
    }
  });
});
