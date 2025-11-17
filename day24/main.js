//get Element Node
const rootEl = document.querySelector("#root");
const appEl = rootEl.querySelector(".app");
const todoWrapperEl = appEl.querySelector(".todoWrapper");
const todoFormEl = todoWrapperEl.querySelector(".todoForm");
const inputEl = todoFormEl.querySelector(".todoInput");
const btnEl = todoFormEl.querySelector(".todoBtn");

//variable icon
const editIcon = "./images/edit-icon.svg";
const deleteIcon = "./images/delete-icon.svg";

//createTodo
function createTodo(elementNode) {
  const divEl = document.createElement("div");
  const editIconEl = document.createElement("img");
  const deleteIconEl = document.createElement("img");
  editIconEl.src = editIcon;
  editIconEl.classList.add("editIcon");
  deleteIconEl.src = deleteIcon;
  deleteIconEl.classList.add("deleteIcon");
  elementNode.append(divEl);
  divEl.append(editIconEl);
  divEl.append(deleteIconEl);
}

//createTodoForm
function createTodoForm(formNode) {
  const inputEl = document.createElement("input");
  const btnEl = document.createElement("button");
  inputEl.type = "text";
  inputEl.placeholder = "Update task";
  inputEl.classList.add("todoInput");
  btnEl.innerText = "Add Task";
  btnEl.classList.add("todoBtn");
  formNode.append(inputEl);
  formNode.append(btnEl);
}

//prevent
function prevent(event) {
  event.preventDefault();
}
//block page loading
todoFormEl.addEventListener("submit", prevent);

//create
inputEl.addEventListener("input", () => {
  if (inputEl.value) {
    btnEl.onclick = function () {
      const todoEl = document.createElement("div");
      const pEl = document.createElement("p");
      todoWrapperEl.append(todoEl);
      todoEl.classList.add("todo");
      todoEl.append(pEl);
      createTodo(todoEl);
      pEl.innerText = inputEl.value;
      inputEl.value = "";
      setTimeout(() => (btnEl.onclick = null), 0);
    };
  }
});

todoWrapperEl.addEventListener("click", () => {
  const todoEls = todoWrapperEl.querySelector(".todo")
    ? todoWrapperEl.querySelectorAll(".todo")
    : null;
  if (todoEls !== null) {
    todoEls.forEach((item) => {
      const deleteIconEl = item.querySelector(".deleteIcon");
      deleteIconEl.onclick = () => {
        item.outerHTML = "";
      };
      const taskEl = item.querySelector("p");
      taskEl.onclick = () => {
        taskEl.classList.toggle("complete");
      };
      const editIconEl = item.querySelector(".editIcon");
      editIconEl.onclick = () => {
        const todoFormEl = document.createElement("form");
        createTodoForm(todoFormEl);
        todoWrapperEl.insertBefore(todoFormEl, item.nextElementSibling);
        todoFormEl.classList.add("todoForm");
        const valueInput = item.querySelector("p");
        const inputEl = todoFormEl.querySelector(".todoInput");
        const btnEl = todoFormEl.querySelector(".todoBtn");
        inputEl.value = valueInput.innerText;
        inputEl.focus();
        item.outerHTML = "";
        todoFormEl.addEventListener("submit", prevent);
        btnEl.onclick = function () {
          const todoEl = document.createElement("div");
          const pEl = document.createElement("p");
          todoWrapperEl.append(todoEl);
          todoWrapperEl.insertBefore(todoEl, todoFormEl.nextElementSibling);
          todoEl.classList.add("todo");
          todoEl.append(pEl);
          createTodo(todoEl);
          pEl.innerText = inputEl.value;
          pEl.className = taskEl.className;
          setTimeout(() => (todoFormEl.outerHTML = ""), 0);
        };
      };
    });
  }
});
