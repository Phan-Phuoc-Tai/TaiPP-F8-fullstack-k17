const SERVER_AUTH = "https://api.escuelajs.co/api/v1";
const loginForm = document.querySelector(".js-login-form");

const HTTP = {
  init() {
    this.submitForm();
  },

  submitForm() {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = loginForm.querySelector(".js-email").value;
      const password = loginForm.querySelector(".js-password").value;
      const errors = {};
      if (!email) {
        errors.email = "Vui lòng nhập Email";
      }
      if (!password) {
        errors.password = "Vui lòng nhập Password";
      }

      const errorElList = loginForm.querySelectorAll(".js-error");
      errorElList.forEach((errorEl) => {
        errorEl.innerText = "";
      });

      if (Object.keys(errors).length) {
        Object.keys(errors).forEach((key) => {
          const message = errors[key];
          const errorEl = loginForm.querySelector(`.error-${key}`);
          errorEl.innerText = message;
        });
      } else {
        this.showLoading();
        const loginData = await this.requestLogin({ email, password });
        this.removeShowLoading();
        if (!loginData) {
          this.showMessage("Email hoặc mật khẩu không chính xác");
        } else {
          localStorage.setItem("access_token", loginData.access_token);
          localStorage.setItem("refresh_token", loginData.refresh_token);
          window.location.href = "trello.html";
        }
      }
    });
  },

  async requestLogin(loginData) {
    try {
      const response = await fetch(`${SERVER_AUTH}/auth/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      if (!response.ok) {
        throw new Error("Unauthorized");
      }
      return response.json();
    } catch {
      return false;
    }
  },

  showMessage(msg) {
    const messageEl = document.querySelector(".js-message");
    messageEl.innerText = msg;
    messageEl.classList.add("message-danger");
  },

  showLoading() {
    const loginBtn = loginForm.querySelector(".login-btn");
    loginBtn.innerText = "Loading...";
    loginBtn.disabled = true;
  },

  removeShowLoading() {
    const loginBtn = loginForm.querySelector(".login-btn");
    loginBtn.innerText = "Login";
    loginBtn.disabled = false;
  },
};

HTTP.init();
