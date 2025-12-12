const SERVER_AUTH = "https://api.escuelajs.co/api/v1";
const profile = document.querySelector(".profile");
const profileName = profile.querySelector("span");
const container = document.querySelector(".container");

const trello = {
  init() {
    this.getProfile();
    this.handleLogout();
    this.handleAddNewList();
  },
  handleLogout() {
    const logoutBtn = profile.querySelector(".js-logout-btn");
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      window.location.href = "index.html";
    });
  },
  async getProfile() {
    const response = await instance.get(`/auth/profile`);
    const profileData = response.data;
    profileName.innerText = profileData.name;
  },

  createNewList() {
    const newList = document.createElement("div");
    const icon = document.createElement("i");

    newList.classList.add("add-new-list");
    newList.innerText = "Create New List";
    newList.prepend(icon);
    icon.classList.add(`fa-solid`, `fa-plus`);
    return newList;
  },

  createContentAdd(type, msg, btnText) {
    const contentAdd = document.createElement("form");
    const inputEl = document.createElement(`${type}`);
    const divEl = document.createElement("div");
    const createBtn = document.createElement("button");
    const closeBtn = document.createElement("span");

    inputEl.type = "text";
    inputEl.placeholder = `${msg}`;
    inputEl.classList.add("form-control");
    contentAdd.classList.add("content-add");
    createBtn.classList.add("content-create");
    closeBtn.classList.add("content-close", "fa-solid", "fa-xmark");
    createBtn.innerText = `${btnText}`;
    contentAdd.append(inputEl, divEl);
    divEl.append(createBtn, closeBtn);
    return contentAdd;
  },

  createCardList() {
    const cardList = document.createElement("div");
    const cardHeader = cardList.cloneNode(true);
    const cardHeaderTitle = document.createElement("input");
    const dropIcon = document.createElement("i");
    const cardBody = document.createElement("ul");
    const cardFooter = cardHeader.cloneNode(true);
    const addCardBtn = dropIcon.cloneNode(true);
    const contentFooter = document.createElement("span");

    cardHeader.classList.add("card-header");
    dropIcon.classList.add("fa-solid", "fa-ellipsis", "icon");
    cardHeader.append(cardHeaderTitle, dropIcon);

    cardBody.classList.add("card-body");
    cardFooter.classList.add("card-footer");
    addCardBtn.classList.add(`fa-solid`, `fa-plus`);
    contentFooter.innerText = "Add a card";
    cardFooter.append(addCardBtn, contentFooter);

    cardList.classList.add("card-list");
    cardList.append(cardHeader, cardBody, cardFooter);
    return cardList;
  },

  createCardItem(elementNode, content) {
    const cardItem = document.createElement("li");
    const itemContent = document.createElement("span");
    const itemCloseBtn = document.createElement("i");

    cardItem.classList.add("card-item");
    itemCloseBtn.classList.add("fa-solid", "fa-xmark", "icon");
    itemContent.innerText = content;
    cardItem.append(itemContent, itemCloseBtn);
    elementNode.append(cardItem);

    return elementNode;
  },

  handleAddNewList() {
    container.addEventListener("mousedown", (e) => {
      e.stopPropagation();
      const newList = container.querySelector(".add-new-list");
      if (newList) {
        newList.onclick = (e) => {
          e.stopPropagation();
          newList.replaceWith(
            this.createContentAdd("input", "Enter List Title...", "Create List")
          );
          this.handleContentAdd();
        };
      }
    });
  },

  handleContentAdd() {
    const contentAdd = container.querySelector(".content-add");
    const formControl = contentAdd.querySelector(".form-control");
    const closeBtn = contentAdd.querySelector(".content-close");
    const createBtn = contentAdd.querySelector(".content-create");
    formControl.focus();
    contentAdd.addEventListener("submit", this.handlePrevent);

    closeBtn.onclick = (e) => {
      e.stopPropagation();
      contentAdd.replaceWith(this.createNewList());
    };

    createBtn.onclick = (e) => {
      e.stopPropagation();
      if (formControl.value) {
        const cardList = this.createCardList();
        const cardHeaderTitle = cardList.querySelector(".card-header input");
        cardHeaderTitle.value = formControl.value;
        // cardHeaderTitle.disabled = true;
        container.insertBefore(cardList, contentAdd);
        formControl.value = "";
        formControl.focus();
        this.handleCardList();
      }
    };
  },

  handleCardList() {
    const cards = container.querySelectorAll(".card-list");
    cards.forEach((card) => {
      const cardHeaderTitle = card.querySelector(".card-header input");
      cardHeaderTitle.addEventListener("mousedown", this.handlePrevent);
      cardHeaderTitle.addEventListener("dblclick", () => {
        cardHeaderTitle.removeEventListener("mousedown", this.handlePrevent);
        cardHeaderTitle.focus();
      });
      document.addEventListener("click", () => {
        cardHeaderTitle.addEventListener("mousedown", this.handlePrevent);
      });
      this.handleCreateCardItem(card);
    });
  },

  handleCreateCardItem(card) {
    const addCardBtn = card.querySelector(".card-footer");
    addCardBtn.onclick = (e) => {
      const contentFooter = e.target.parentElement;
      const addNewCard = this.createContentAdd(
        "textarea",
        "Enter card title...",
        "Add card"
      );
      const contentBody = contentFooter.previousElementSibling;
      contentBody.append(addNewCard);
      const textAreaEl = addNewCard.querySelector("textarea");
      const addBtnEl = addNewCard.querySelector(".content-create");
      const closeEl = addNewCard.querySelector(".content-close");
      textAreaEl.focus();
      textAreaEl.rows = 1;
      addCardBtn.classList.toggle("hidden");
      addNewCard.addEventListener("submit", this.handlePrevent);
      textAreaEl.addEventListener("keydown", (e) => {
        const isEnter = e.key === "Enter" ? true : false;
        if (isEnter) {
          this.createCardItem(contentBody, textAreaEl.value);
          addNewCard.remove();
          addCardBtn.classList.toggle("hidden");
        }
      });
      addBtnEl.onclick = (e) => {
        e.stopPropagation();
        this.createCardItem(contentBody, textAreaEl.value);
        setTimeout(() => {
          addNewCard.remove();
        }, 0);
        addCardBtn.classList.toggle("hidden");
      };

      closeEl.onclick = (e) => {
        e.stopPropagation();
        addCardBtn.classList.toggle("hidden");
        addNewCard.remove();
      };
    };
  },

  handleDragCardList(e, card) {
    const css = {
      left: `${e.clientX}px`,
      top: `${e.clientY}px`,
    };
    Object.assign(card.style, css);
  },
  handlePrevent(e) {
    e.preventDefault();
  },
};
trello.init();
