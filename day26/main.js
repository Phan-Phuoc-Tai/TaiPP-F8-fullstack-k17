//createItem function
const createItem = (elementNode, quantity) => {
  const item = document.createElement("li");

  for (let i = 1; i <= quantity; i++) {
    const upBtn = document.createElement("span");
    const downBtn = upBtn.cloneNode(true);
    const textContent = upBtn.cloneNode(true);
    const itemClone = item.cloneNode(true);
    itemClone.append(textContent);
    textContent.classList.add("content");
    textContent.innerText = `Item ${i}`;
    itemClone.append(upBtn);
    upBtn.classList.add("up");
    upBtn.innerText = `Up`;
    itemClone.append(downBtn);
    downBtn.classList.add("down");
    downBtn.innerText = `Down`;
    elementNode.append(itemClone);
  }

  return elementNode;
};

//createSubmenuItem
const createSubmenuItem = (elementNode) => {
  const subItem = document.createElement("li");
  const renameItem = subItem.cloneNode(true);
  const deleteItem = subItem.cloneNode(true);

  elementNode.append(renameItem);
  renameItem.innerText = `Rename`;
  renameItem.classList.add("renameItem");
  elementNode.append(deleteItem);
  deleteItem.innerText = `Delete`;
  deleteItem.classList.add("deleteItem");

  return elementNode;
};

//createEditSpace function
const createEditSpace = (elementNode) => {
  const overlay = document.createElement("div");
  const editSpace = document.createElement("form");
  const inputText = document.createElement("input");
  const saveBtn = document.createElement("button");
  elementNode.append(overlay);
  overlay.classList.add("overlay");
  elementNode.append(editSpace);
  editSpace.classList.add("editSpace");
  editSpace.append(inputText);
  inputText.classList.add("inputText");
  inputText.type = "text";
  editSpace.append(saveBtn);
  saveBtn.classList.add("saveBtn");
  saveBtn.innerText = "Save";
};

//handlePrevent function
const handlePrevent = (e) => {
  e.preventDefault();
};

const root = document.querySelector("#root");
const modal = document.querySelector("#modal");

//create menu, item
const menu = document.createElement("ul");
const submenu = menu.cloneNode(true);

root.append(menu);
menu.classList.add("menu");
createItem(menu, 5);
submenu.classList.add("submenu");
createSubmenuItem(submenu);
createEditSpace(modal);

document.addEventListener("mousedown", () => {
  const itemList = menu.querySelectorAll("li");
  itemList.forEach((item) => {
    const upBtn = item.querySelector(".up");
    const downBtn = item.querySelector(".down");
    const textContent = item.querySelector(".content");

    upBtn.onclick = (e) => {
      e.stopPropagation();
      const previousEl = item.previousElementSibling;

      if (!previousEl) {
        return;
      }

      menu.insertBefore(item, previousEl);
    };

    downBtn.onclick = (e) => {
      e.stopPropagation();
      const nextEl = item.nextElementSibling;

      if (!nextEl) {
        return;
      }

      menu.insertBefore(nextEl, item);
    };

    //item selected
    textContent.onclick = (e) => {
      e.stopPropagation();
      const selectedItems = menu.querySelectorAll(".selected");
      const isCtrlKey = e.ctrlKey ? true : false;

      if (!isCtrlKey && selectedItems) {
        selectedItems.forEach((selectedItem) => {
          selectedItem.classList.remove("selected");
        });
      }

      item.classList.add("selected");
    };

    //submenu
    textContent.addEventListener("mouseup", (e) => {
      e.stopPropagation();
      const isRightMouse = e.button === 2 ? true : false;

      if (!isRightMouse) {
        const css = {
          opacity: 0,
          visibility: "hidden",
        };
        Object.assign(submenu.style, css);

        return;
      }

      document.addEventListener("contextmenu", handlePrevent);

      root.append(submenu);
      const offsetY = e.offsetY;
      const clientX = e.clientX;
      const clientY = item.offsetTop + offsetY;
      const css = {
        opacity: 1,
        visibility: "visible",
        left: `${clientX}px`,
        top: `${clientY}px`,
      };

      Object.assign(submenu.style, css);

      const deleteItem = submenu.querySelector(".deleteItem");
      const renameItem = submenu.querySelector(".renameItem");

      deleteItem.onclick = () => {
        item.remove();
      };

      renameItem.onclick = () => {
        const css = {
          opacity: 1,
          visibility: "visible",
        };
        Object.assign(modal.style, css); //show modal

        const overlay = modal.querySelector(".overlay");
        const editSpace = modal.querySelector(".editSpace");
        const inputText = editSpace.querySelector(".inputText");
        const saveBtn = editSpace.querySelector(".saveBtn");

        editSpace.addEventListener("submit", handlePrevent);

        editSpace.addEventListener("click", (e) => {
          e.stopPropagation();
        });

        inputText.value = textContent.innerText;
        inputText.focus();

        saveBtn.onclick = (e) => {
          e.stopPropagation();
          const css = {
            opacity: 0,
            visibility: "hidden",
          };
          //prevent XSS
          textContent.innerText = inputText.value
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;");
          Object.assign(modal.style, css);
        };

        overlay.onclick = () => {
          const css = {
            opacity: 0,
            visibility: "hidden",
          };
          Object.assign(modal.style, css);
        };
      };
    });
  });
});

//cancel selectedItems
document.addEventListener("click", () => {
  const selectedItems = menu.querySelectorAll(".selected");

  selectedItems.forEach((selectedItem) => {
    selectedItem.classList.remove("selected");
  });
});

document.addEventListener("keydown", (e) => {
  const isArrowDown = e.key === "ArrowDown" ? true : false;
  const isArrowUp = e.key === "ArrowUp" ? true : false;
  const isAltKey = e.altKey;
  const isShiftKey = e.shiftKey;
  const isEscKey = e.key === "Escape" ? true : false;
  const itemSelected = menu.querySelector(".selected");
  const itemClone = itemSelected ? itemSelected.cloneNode(true) : null;

  //hidden submenu & modal = escape
  if (isEscKey) {
    const css = {
      opacity: 0,
      visibility: "hidden",
    };
    Object.assign(submenu.style, css);
    Object.assign(modal.style, css);
  }

  if (!itemSelected) {
    return;
  }

  itemClone.classList.remove("selected");

  //clone item
  if (isAltKey && isShiftKey) {
    if (isArrowUp) {
      menu.insertBefore(itemClone, itemSelected);
    }
    if (isArrowDown) {
      const nextEl = itemSelected.nextElementSibling;
      menu.insertBefore(itemClone, nextEl);
    }
  }
});

//hidden submenu
document.addEventListener("mouseup", () => {
  document.removeEventListener("contextmenu", handlePrevent);
  const css = {
    opacity: 0,
    visibility: "hidden",
  };
  Object.assign(submenu.style, css);
});
