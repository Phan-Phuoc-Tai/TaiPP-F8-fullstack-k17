//get Element Node
const rootEl = document.querySelector("#root");
const appEl = rootEl.querySelector(".app");
const todoWrapperEl = appEl.querySelector(".todoWrapper");
const todoFormEl = todoWrapperEl.querySelector(".todoForm");
const inputEl = todoFormEl.querySelector(".todoInput");
const btnEl = todoFormEl.querySelector(".todoBtn");

//variable
const editIcon = "./images/edit-icon.svg";
const deleteIcon = "./images/delete-icon.svg";
const errorEl = document.createElement("span");
//preventDefault
function preventDefault(event) {
  event.preventDefault();
}
//validateInput
function validateInput(value, arr) {
  let notice = "";
  if (!value) {
    return `This task can not be blank`;
  }
  arr.forEach((item) => {
    if (item.innerText.toLocaleLowerCase() === value.toLocaleLowerCase()) {
      notice = `This task already exists`;
    }
  });
  return notice;
}
//createTodo
function createTodo(elementNode, value) {
  const divEl = document.createElement("div");
  const pEl = document.createElement("p");
  const editIconEl = document.createElement("img");
  const deleteIconEl = document.createElement("img");
  editIconEl.src = editIcon;
  editIconEl.classList.add("editIcon");
  deleteIconEl.src = deleteIcon;
  deleteIconEl.classList.add("deleteIcon");
  elementNode.classList.add("todo");
  elementNode.append(pEl);
  elementNode.append(divEl);
  divEl.append(editIconEl);
  divEl.append(deleteIconEl);
  pEl.innerText = value;
}

//createFrom
function createFrom(elementNode, value) {
  const inputEl = document.createElement("input");
  const btnEl = document.createElement("button");
  inputEl.type = "text";
  inputEl.placeholder = "Update task";
  inputEl.value = value;
  inputEl.classList.add("todoInput");
  btnEl.innerText = "Add Task";
  btnEl.classList.add("todoBtn");
  elementNode.classList.add("todoForm");
  elementNode.append(inputEl);
  elementNode.append(btnEl);
}

todoFormEl.addEventListener("submit", preventDefault);

inputEl.addEventListener("input", () => {
  btnEl.onclick = () => {
    const todoForm = document.createElement("form");
    const todoEl = document.createElement("div");
    const todoList = todoWrapperEl.querySelectorAll(".todo");
    const errorNoticeEl = todoWrapperEl.querySelector("span");
    const isErrorInput = validateInput(inputEl.value, todoList) || null;
    if (inputEl.value) {
      todoWrapperEl.append(todoEl);
      todoWrapperEl.append(todoForm);
      createTodo(todoEl, inputEl.value);
      createFrom(todoForm, inputEl.value);
      inputEl.value = "";
      todoForm.classList.add("hidden");
    }
    if (errorNoticeEl) {
      errorEl.outerHTML = "";
    }
    if (isErrorInput) {
      todoFormEl.append(errorEl);
      errorEl.innerText = isErrorInput;
      todoEl.outerHTML = "";
    }
  };
});

todoWrapperEl.addEventListener("click", () => {
  const todoList = document.querySelectorAll(".todo") || null;
  const todoFormList = document.querySelectorAll(".todoForm") || null;
  if (todoList) {
    todoList.forEach((todo, index) => {
      const deleteIconEl = todo.querySelector(".deleteIcon");
      deleteIconEl.onclick = () => {
        todo.outerHTML = "";
        todoFormList[index++].outerHTML = "";
      };
      const taskDone = todo.querySelector("p");
      taskDone.onclick = () => {
        taskDone.classList.toggle("complete");
      };
      const editIconEl = todo.querySelector(".editIcon");
      editIconEl.onclick = () => {
        const todoForm = todoFormList[++index];
        todoForm.classList.remove("hidden");
        todo.classList.add("hidden");
        todoForm.addEventListener("submit", preventDefault);
        const inputEl = todoForm.querySelector(".todoInput");
        const btnEl = todoForm.querySelector(".todoBtn");
        btnEl.addEventListener("click", (e) => {
          e.stopPropagation();
          const errorNoticeEl = todoWrapperEl.querySelector("span");
          let isErrorInput = validateInput(inputEl.value, todoList) || null;
          const pEl = todo.querySelector("p");

          if (
            inputEl.value === pEl.innerText ||
            (inputEl.value !== pEl.innerText && !isErrorInput)
          ) {
            todoForm.classList.add("hidden");
            todo.classList.remove("hidden");
            pEl.innerText = inputEl.value;
            isErrorInput = "";
          }
          if (errorNoticeEl) {
            errorEl.outerHTML = "";
          }

          if (inputEl.value !== pEl.innerText && isErrorInput) {
            todoForm.append(errorEl);
            errorEl.innerText = isErrorInput;
          }
        });
      };
    });
  }
});
