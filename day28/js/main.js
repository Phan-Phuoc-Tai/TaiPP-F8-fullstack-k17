const blogsEl = document.querySelector("#blogs");
const postsEl = blogsEl.querySelector(".posts");
const loadingEl = blogsEl.querySelector(".posts li");
const modalEl = document.querySelector("#modal");
const modalInner = modalEl.querySelector(".modal-inner");
const modalTitle = modalEl.querySelector(".modal-title h2");
const modalBody = modalEl.querySelector(".modal-body");

const createPost = (postsEl, title, body, id) => {
  const post = document.createElement("li");
  const postTitle = document.createElement("h2");
  const postBody = document.createElement("p");
  const postFooter = document.createElement("div");
  const detailBtn = document.createElement("button");
  const editBtn = detailBtn.cloneNode(true);
  const deleteBtn = detailBtn.cloneNode(true);
  const postId = document.createElement("span");

  //add text
  postTitle.innerText = title;
  postBody.innerText = body;
  detailBtn.innerText = "Xem chi tiết";
  editBtn.innerText = "Sửa";
  deleteBtn.innerText = "Xóa";
  postId.innerText = id;
  //add post in posts
  post.classList.add("post");
  postsEl.append(post);
  //add postId in post
  postId.classList.add("post-id");
  post.append(postId);

  //add postTitle in post
  postTitle.classList.add("post-title");
  post.append(postTitle);

  //add postBody in post
  postBody.classList.add("post-body");
  post.append(postBody);

  //add postFooter in post
  postFooter.classList.add("post-footer");
  post.append(postFooter);

  //add detailBtn in postFooter
  detailBtn.classList.add("detail");
  postFooter.append(detailBtn);

  //add editBtn in postFooter
  editBtn.classList.add("edit");
  postFooter.append(editBtn);

  //add deleteBtn in postFooter
  deleteBtn.classList.add("delete");
  postFooter.append(deleteBtn);
};

//API
const BASE_URL = "https://dummyjson.com";

const preventXSS = (str) => {
  return str.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
};

const refresh = (element) => {
  element.innerHTML = "";
};

const showError = (message) => {
  const errorMessage = document.createElement("li");
  refresh(postsEl);
  errorMessage.classList.add("error");
  errorMessage.innerText = message;
  postsEl.append(errorMessage);
};

const renderUI = (data) => {
  const posts = data.posts;
  try {
    if (posts.length === 0) {
      throw new Error(
        "Rất tiếc, chúng tôi không tìm thấy bài viết nào khớp với tìm kiếm của bạn"
      );
    }
    refresh(postsEl);
    const post = posts
      .map((item) => {
        const title = item.title;
        const body = item.body;
        const id = item.id;

        createPost(postsEl, title, body, id);
      })
      .join("");
    postsEl.append(post);
  } catch (error) {
    showError(error.message);
  }
};

const renderPostId = (data) => {
  const title = data.title;
  const body = data.body;

  modalTitle.innerText = title;
  modalBody.innerText = body;
};

const getInfo = async (information, service, isModal) => {
  try {
    const linkInfo = service
      ? `${BASE_URL}/${information}${service}`
      : `${BASE_URL}/${information}`;

    const response = await fetch(linkInfo);

    if (!response.ok) {
      throw new Error("Đã có lỗi xảy ra, xin vui lòng thử lại");
    }
    const data = await response.json();
    if (isModal) {
      renderPostId(data);
    } else {
      renderUI(data);
    }
  } catch (error) {
    showError(error.message);
  }
};

const closeModal = () => {
  const span = document.createElement("span");
  modalEl.classList.toggle("hidden");
  modalTitle.innerText = "";
  modalBody.innerText = "";
  span.innerText = "Loading...";
  modalBody.append(span);
};

const sortLatest = "?sortBy=id&order=desc";
const sortOldest = "?sortBy=id&order=asc";
const limit = "?limit=30&page=2";
getInfo("posts", sortLatest);

const blogSortEl = blogsEl.querySelector(".blog-sort");
const sortLatestBtn = blogSortEl.querySelector(".sort-latest");
const sortOldestBtn = blogSortEl.querySelector(".sort-oldest");
const sortActiveBtn = blogSortEl.querySelector(".active");

sortOldestBtn.addEventListener("click", (e) => {
  const sortActiveBtn = blogSortEl.querySelector(".active");
  sortOldestBtn.classList.add("active");
  if (sortActiveBtn) {
    sortActiveBtn.classList.remove("active");
  }
  refresh(postsEl);
  postsEl.append(loadingEl);
  getInfo("posts", sortOldest);
});

sortLatestBtn.addEventListener("click", (e) => {
  const sortActiveBtn = blogSortEl.querySelector(".active");
  sortLatestBtn.classList.add("active");
  if (sortActiveBtn) {
    sortActiveBtn.classList.remove("active");
  }
  refresh(postsEl);
  postsEl.append(loadingEl);
  getInfo("posts", sortLatest);
});

const searchBtnEl = blogsEl.querySelector(".search-btn");
searchBtnEl.addEventListener("change", () => {
  let search = "/search?q=";
  const errorEl = postsEl.querySelector(".error");
  const condition = preventXSS(searchBtnEl.value);

  if (errorEl) {
    errorEl.remove();
  }

  if (!condition) {
    refresh(postsEl);
    postsEl.append(loadingEl);
    return getInfo("posts", sortLatest);
  }

  search += condition;
  refresh(postsEl);
  postsEl.append(loadingEl);
  getInfo("posts", search);
});
const overlay = modalEl.querySelector(".overlay");

const updateModalHeight = () => {
  const css = {
    height: `${blogsEl.clientHeight}px`,
    position: "absolute",
    inset: 0,
  };
  Object.assign(modalEl.style, css);
  Object.assign(overlay.style, css);
};

postsEl.addEventListener("mousedown", (e) => {
  e.stopPropagation();
  updateModalHeight();

  const postList = postsEl.querySelectorAll(".post");
  postList.forEach((post) => {
    const detailBtn = post.querySelector(".detail");
    detailBtn.onclick = (e) => {
      let detail = "/";
      const postIdEl = post.querySelector(".post-id");
      const id = postIdEl.innerText;
      detail += id;
      modalEl.classList.toggle("hidden");

      getInfo("posts", detail, true);

      //update top modalInner
      let heightViewport = window.screen.height;
      let rate =
        (heightViewport * 0.43 - modalInner.clientHeight) / heightViewport;
      let detailTop = detailBtn.offsetTop;
      let clientY = e.clientY;
      let offsetTop = detailTop - clientY < 0 ? 0 : detailTop - clientY;
      let value = offsetTop + heightViewport * rate;
      const css = {
        top: `${value}px`,
      };
      Object.assign(modalInner.style, css);
    };
  });
});

overlay.addEventListener("click", (e) => {
  e.stopPropagation();
  closeModal();
});

const modalClose = modalEl.querySelector(".modal-close");
modalClose.addEventListener("click", (e) => {
  e.stopPropagation();
  closeModal();
});

document.addEventListener("keydown", (e) => {
  const isEscape = e.key === "Escape" ? true : false;
  if (isEscape) {
    closeModal();
  }
});
