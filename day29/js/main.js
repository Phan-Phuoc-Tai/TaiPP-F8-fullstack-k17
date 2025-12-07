const BASE_URL = "https://dummyjson.com";
const app = {
  _query: {
    q: "",
    sortBy: "id",
    order: "desc",
    limit: 10,
    page: 1,
    postId: null,
  },
  _info: "/posts",
  init() {
    this.getPosts();
    this.search();
    this.sort();
    this.paginate();
    this.detailControls();
    this.renderAddPost();
    this.actionControl();
  },

  getUrl(info) {
    let skip = (this._query.page - 1) * this._query.limit;
    let url = `${BASE_URL}${info}?sortBy=${this._query.sortBy}&order=${this._query.order}&limit=${this._query.limit}&skip=${skip}`;
    if (this._query.q) {
      const searchKeyword = `/search?q=${this._query.q}&?sortBy=${this._query.sortBy}&order=${this._query.order}&limit=${this._query.limit}&skip=${skip}`;
      url = BASE_URL + info + searchKeyword;
    }
    if (this._query.postId) {
      url = `${BASE_URL}${info}/${this._query.postId}`;
    }
    return url;
  },

  async getPosts() {
    const info = this._info;
    const postList = document.querySelector(".js-post-list");
    postList.innerHTML = "";
    try {
      this.renderLoading();
      let url = this.getUrl(info);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${info}`);
      }
      const data = await response.json();
      const pageNumber = Math.ceil(data.total / this._query.limit);
      this.renderPosts(data.posts);
      this.renderPaginate(pageNumber);
    } catch (error) {
      this.renderError(error.message);
    } finally {
      this.renderLoading(false);
    }
  },

  createPost(title, body, id) {
    const postEl = document.createElement("li");
    const postTitleEl = document.createElement("h2");
    const postBodyEl = document.createElement("p");
    const featureEl = document.createElement("div");
    const viewDetailBtn = document.createElement("button");
    const editBtn = viewDetailBtn.cloneNode(true);
    const deleteBtn = viewDetailBtn.cloneNode(true);

    postEl.append(postTitleEl, postBodyEl, featureEl);
    featureEl.append(viewDetailBtn, editBtn, deleteBtn);

    postEl.classList.add("post");
    postTitleEl.classList.add("post-title");
    postBodyEl.classList.add("post-body");
    featureEl.classList.add("feature");
    viewDetailBtn.classList.add("js-view-detail");
    editBtn.classList.add("edit-btn");
    deleteBtn.classList.add("delete-btn");

    postEl.dataset.id = id;
    postTitleEl.innerText = this.sanitizeText(title);
    postBodyEl.innerText = this.sanitizeText(body);
    viewDetailBtn.innerText = "Xem chi tiết";
    editBtn.innerText = "Sửa";
    deleteBtn.innerText = "Xoá";

    return postEl;
  },

  renderPaginate(pageNumber) {
    const paginateEl = document.querySelector(".js-paginate");
    paginateEl.innerHTML = "";
    for (let page = 1; page <= pageNumber; page++) {
      const pageActive = this._query.page === page ? "bg-green-600" : "";
      paginateEl.innerHTML += `<button class =${pageActive}>${page}</button>`;
    }
  },

  renderLoading(status = true) {
    const loading = document.querySelector(".js-loading");
    loading.innerHTML = status
      ? `<span class="block text-3xl text-center">Loading...</span>`
      : "";
  },

  renderError(message) {
    const postList = document.querySelector(".js-post-list");
    postList.innerHTML = `<span class="mt-3 text-2xl text-red-500">${message}</span>`;
  },

  renderPosts(posts) {
    const postList = document.querySelector(".js-post-list");
    postList.innerHTML = "";
    posts
      .map((item) => {
        let post = this.createPost(item.title, item.body, item.id);
        postList.append(post);
      })
      .join("");

    postList.addEventListener("mousedown", () => {
      const posts = postList.querySelectorAll(".post");
      this.getPostId(posts);
    });
  },

  sanitizeText(text) {
    return text.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  },

  search() {
    const searchEl = document.querySelector(".js-search");
    searchEl.addEventListener(
      "input",
      this.debounce((e) => {
        const keyword = e.target.value;
        this._query.q = keyword;
        this.getPosts();
      })
    );
  },

  debounce(callback, timeout = 500) {
    let id;
    return (...args) => {
      if (id) {
        clearTimeout(id);
      }
      id = setTimeout(() => {
        callback.apply(null, args);
      }, timeout);
    };
  },

  sort() {
    const controlList = document.querySelectorAll(".controls button");
    controlList.forEach((control) => {
      control.addEventListener("click", (e) => {
        const btnActive = document.querySelector(".active");
        const sortOrder = e.target.dataset.sort;
        if (btnActive) {
          btnActive.classList.remove("active");
        }
        control.classList.add("active");
        this._query.order = sortOrder;
        this.getPosts();
      });
    });
  },

  paginate() {
    const paginateEl = document.querySelector(".js-paginate");
    paginateEl.addEventListener("mousedown", (e) => {
      let page = +e.target.innerText;
      this._query.page = page;
      window.scroll({
        top: 0,
        behavior: "smooth",
      });
      this.getPosts();
    });
  },

  getPostId(posts) {
    const info = this._info;
    posts.forEach((post) => {
      let viewDetailBtn = post.querySelector(".js-view-detail");
      viewDetailBtn.onclick = async (e) => {
        e.stopPropagation();
        this._query.postId = +post.dataset.id;
        let url = this.getUrl(info);
        const response = await fetch(url);
        const data = await response.json();
        this.renderPostId(data);
      };
      let editBtn = post.querySelector(".edit-btn");
      editBtn.onclick = async (e) => {
        e.stopPropagation();
        this._query.postId = +post.dataset.id;
        let url = this.getUrl(info);
        const response = await fetch(url);
        const data = await response.json();
        this.renderUpdatePost(data);
      };
      let deleteBtn = post.querySelector(".delete-btn");
      deleteBtn.onclick = async (e) => {
        e.stopPropagation();
        let result = confirm("Bạn có chắc muốn xoá không?");
        if (result) {
          this.deletePost(+post.dataset.id);
        }
      };
    });
  },

  renderPostId(post) {
    const modalEl = document.querySelector(".modal");
    const overlay = modalEl.querySelector(".js-overlay");
    const modalDetail = modalEl.querySelector(".js-modal-detail");
    const detailTitle = modalDetail.querySelector(".js-detail-title h2");
    const detailBody = modalDetail.querySelector(".js-detail-body");

    const css = {
      position: "fixed",
      display: "block",
    };
    Object.assign(modalEl.style, css);
    Object.assign(overlay.style, css);
    Object.assign(modalDetail.style, css);

    setTimeout(() => {
      detailTitle.innerText = post.title;
      detailBody.innerText = post.body;
    }, 200);
  },

  detailControls() {
    const modalEl = document.querySelector(".modal");
    const modalDetail = modalEl.querySelector(".js-modal-detail");
    const detailBody = modalEl.querySelector(".js-detail-body");
    const loading = detailBody.querySelector("span");
    const overlay = modalEl.querySelector(".js-overlay");
    const closeModal = modalEl.querySelector(".js-close-modal");

    overlay.addEventListener("click", (e) => {
      e.stopPropagation();
      this.closeModal(modalEl, overlay, modalDetail, loading);
    });
    closeModal.addEventListener("click", (e) => {
      e.stopPropagation();
      this.closeModal(modalEl, overlay, modalDetail, loading);
    });

    document.addEventListener("keydown", (e) => {
      const isEscape = e.key === "Escape" ? true : false;
      if (isEscape) {
        this.closeModal(modalEl, overlay, modalDetail, loading);
      }
    });
  },
  closeModal(modalEl, overlay, modalDetail, loading) {
    const detailTitle = modalDetail.querySelector(".js-detail-title h2");
    const detailBody = modalDetail.querySelector(".js-detail-body");
    const css = {
      display: "none",
    };
    this._query.postId = null;
    Object.assign(modalEl.style, css);
    Object.assign(overlay.style, css);
    Object.assign(modalDetail.style, css);
    if (detailTitle) {
      detailTitle.innerHTML = "";
      detailBody.innerHTML = "";
      detailBody.append(loading);
    }
  },

  async addPost(data) {
    const info = this._info;
    const method = "add";
    let url = `${BASE_URL}${info}`;
    const dataJson = JSON.stringify(data);
    const response = await fetch(`${url}/${method}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: dataJson,
    });

    if (response.ok) {
      const postList = document.querySelector(".js-post-list");
      const post = await response.json();
      const item = this.createPost(post.title, post.body, post.id);
      postList.prepend(item);
    }
  },

  renderAddPost() {
    const addBtn = document.querySelector(".js-add-btn");
    const modalEl = document.querySelector(".modal");
    const overlay = modalEl.querySelector(".js-overlay");
    const modalAction = modalEl.querySelector(".js-modal-action");
    const actionTitle = modalAction.querySelector(".js-title h2");
    const actionBody = modalAction.querySelector(".js-body");
    const formEl = actionBody.querySelector("form");
    const titleContent = actionBody.querySelector(".js-title-content");
    const bodyContent = actionBody.querySelector(".js-body-content");
    addBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const css = {
        position: "fixed",
        display: "block",
      };

      Object.assign(modalEl.style, css);
      Object.assign(overlay.style, css);
      Object.assign(modalAction.style, css);
      actionTitle.innerText = "Thêm bài viết";
      titleContent.value = "";
      bodyContent.value = "";
      titleContent.focus();
    });
    formEl.onsubmit = (e) => {
      e.preventDefault();
      if (titleContent.value && bodyContent.value) {
        const post = {
          userId: 5,
          title: `${titleContent.value}`,
          body: `${bodyContent.value}`,
        };
        this.addPost(post);
        setTimeout(() => {
          this.closeModal(modalEl, overlay, modalAction);
        }, 300);
      } else if (!titleContent.value) {
        alert("Không được để trống tiêu đề");
      } else if (!bodyContent.value) {
        alert("Không được để trống nội dung");
      }
    };
  },

  actionControl() {
    const modalEl = document.querySelector(".modal");
    const modalAction = modalEl.querySelector(".js-modal-action");
    const overlay = modalEl.querySelector(".js-overlay");
    const closeModal = modalAction.querySelector(".js-close-modal");

    overlay.addEventListener("click", (e) => {
      e.stopPropagation();
      this.closeModal(modalEl, overlay, modalAction);
    });
    closeModal.addEventListener("click", (e) => {
      e.stopPropagation();
      this.closeModal(modalEl, overlay, modalAction);
    });

    document.addEventListener("keydown", (e) => {
      const isEscape = e.key === "Escape" ? true : false;
      if (isEscape) {
        this.closeModal(modalEl, overlay, modalAction);
      }
    });
  },

  renderUpdatePost(data) {
    const modalEl = document.querySelector(".modal");
    const overlay = modalEl.querySelector(".js-overlay");
    const modalAction = modalEl.querySelector(".js-modal-action");
    const actionTitle = modalAction.querySelector(".js-title h2");
    const actionBody = modalAction.querySelector(".js-body");
    const formEl = actionBody.querySelector("form");
    const titleContent = actionBody.querySelector(".js-title-content");
    const bodyContent = actionBody.querySelector(".js-body-content");

    const css = {
      position: "fixed",
      display: "block",
    };

    Object.assign(modalEl.style, css);
    Object.assign(overlay.style, css);
    Object.assign(modalAction.style, css);
    actionTitle.innerText = "Chỉnh sửa bài viết";
    titleContent.value = data.title;
    titleContent.focus();
    bodyContent.value = data.body;

    formEl.onsubmit = (e) => {
      e.preventDefault();
      if (titleContent.value && bodyContent.value) {
        const post = {
          title: `${titleContent.value}`,
          body: `${bodyContent.value}`,
        };
        this.updatePost(data.id, post);
        setTimeout(() => {
          this.closeModal(modalEl, overlay, modalAction);
        }, 300);
      } else if (!titleContent.value) {
        alert("Không được để trống tiêu đề");
      } else if (!bodyContent.value) {
        alert("Không được để trống nội dung");
      }
    };
  },

  async updatePost(id, post) {
    const info = this._info;
    let url = `${BASE_URL}${info}/${id}`;
    const dataJson = JSON.stringify(post);
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: dataJson,
    });
    if (response.ok) {
      const postList = document.querySelector(".js-post-list");
      const posts = Array.from(postList.children);
      const newPost = await response.json();
      const currentPost = posts.find((post) => +post.dataset.id === id);

      const currentPostTitle = currentPost.firstElementChild;
      const currentPostBody = currentPostTitle.nextElementSibling;
      currentPostTitle.innerText = newPost.title;
      currentPostBody.innerText = newPost.body;
    }
  },

  async deletePost(id) {
    const info = this._info;
    let url = `${BASE_URL}${info}/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
    });
    if (response.ok) {
      const postList = document.querySelector(".js-post-list");
      const posts = Array.from(postList.children);
      const currentPost = posts.find((post) => +post.dataset.id === id);
      currentPost.remove();
    }
  },
};
app.init();

// debounce: nhận vào 1 hàm, trả về 1 hàm
