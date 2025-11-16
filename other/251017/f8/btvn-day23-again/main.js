//Get Element Node
const usernameEl = document.querySelector("#username");
const emailEl = document.querySelector("#email");
const passwordEl = document.querySelector("#password");
const passwordConfirmEl = document.querySelector("#password-confirm");
const btnEl = document.querySelector(".btn");

//Variable notice declaration
const successIconEl = "./images/success-icon.svg";
const noticeIconEl = "./images/notice-icon.svg";
//success function
function success(elementNode) {
  let isSpan = elementNode.querySelector("span");
  let isImg = elementNode.querySelector("img");
  let imageEl;
  let errorNotice;
  if (isSpan) {
    errorNotice = elementNode.querySelector("span");
    errorNotice.outerHTML = "";
  } else {
    errorNotice = document.createElement("span");
  }
  if (isImg) {
    imageEl = elementNode.querySelector("img");
    imageEl.outerHTML = "";
  } else {
    imageEl = document.createElement("img");
  }
  elementNode.append(imageEl);
  imageEl.src = successIconEl;
  return true;
}

//error function
function error(elementNode) {
  let isSpan = elementNode.querySelector("span");
  let isImg = elementNode.querySelector("img");
  let imageEl;
  let errorNotice;
  if (isSpan) {
    errorNotice = elementNode.querySelector("span");
  } else {
    errorNotice = document.createElement("span");
  }
  if (isImg) {
    imageEl = elementNode.querySelector("img");
    imageEl.outerHTML = "";
  } else {
    imageEl = document.createElement("img");
  }
  elementNode.append(imageEl);
  elementNode.append(errorNotice);
  imageEl.src = noticeIconEl;
  return false;
}
//validateUsername
function validateUsername() {
  const usernameDiv = document.querySelector(".username");
  if (usernameEl.value) {
    success(usernameDiv);
    usernameEl.className = "border-gray-300";
  } else {
    error(usernameDiv);
    const errorNotice = usernameDiv.querySelector("span");
    errorNotice.innerText = "Username cannot be blank";
    usernameEl.className = "border-red-500";
  }
}
//validateEmail
function validateEmail() {
  const emailDiv = document.querySelector(".email");
  if (emailEl.value.toString().includes("@")) {
    success(emailDiv);
    emailEl.className = "border-gray-300";
  } else {
    error(emailDiv);
    const errorNotice = emailDiv.querySelector("span");
    errorNotice.innerText = "Please enter valid email address";
    emailEl.className = "border-red-500";
  }
}
//validatePassword
function validatePassword() {
  const passwordDiv = document.querySelector(".password");
  if (passwordEl.value.toString().length < 8 && passwordEl.value) {
    error(passwordDiv);
    const errorNotice = passwordDiv.querySelector("span");
    errorNotice.innerText = "Password must be at least 8 characters";
    passwordEl.className = "border-red-500";
  } else if (passwordEl.value) {
    success(passwordDiv);
    passwordEl.className = "border-gray-300";
  } else {
    error(passwordDiv);
    const errorNotice = passwordDiv.querySelector("span");
    errorNotice.innerText = "Password cannot be blank";
    passwordEl.className = "border-red-500";
  }
}
//validatePasswordConfirm
function validatePasswordConfirm() {
  const passwordConfirmDiv = document.querySelector(".password-confirm");
  if (
    passwordConfirmEl.value !== passwordEl.value &&
    passwordEl.value &&
    passwordConfirmEl.value
  ) {
    error(passwordConfirmDiv);
    const errorNotice = passwordConfirmDiv.querySelector("span");
    errorNotice.innerText = "Password does not match";
    passwordConfirmEl.className = "border-red-500";
  } else if (passwordConfirmEl.value === passwordEl.value && passwordEl.value) {
    passwordConfirmEl.className = "border-gray-300";
    success(passwordConfirmDiv);
  } else {
    error(passwordConfirmDiv);
    const errorNotice = passwordConfirmDiv.querySelector("span");
    errorNotice.innerText = "Password confirmation required";
    passwordConfirmEl.className = "border-red-500";
  }
}

usernameEl.addEventListener("input", validateUsername);
emailEl.addEventListener("input", validateEmail);
passwordEl.addEventListener("input", validatePassword);
passwordConfirmEl.addEventListener("input", validatePasswordConfirm);

btnEl.addEventListener("click", function () {
  validateUsername();
  validateEmail();
  validatePassword();
  validatePasswordConfirm();
});
