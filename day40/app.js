const USERS_URL = "./data/users.json";
const fs = require("fs/promises");
const express = require("express");
const app = express();
app.use(express.json());
const readUsers = async () => {
  const users = await fs.readFile(USERS_URL, "utf-8");
  return JSON.parse(users);
};
//API lấy danh sách users (GET /users)
app.get("/users", async (request, response) => {
  const users = await readUsers();
  const query = request.query.q;

  if (!query) {
    response.status(200);
    response.json(users);
    return;
  }

  const resultsWithQuery = users.filter((user) => {
    return (
      user.name
        .toString()
        .toLocaleLowerCase()
        .includes(query.toLocaleLowerCase()) ||
      user.email
        .toString()
        .toLocaleLowerCase()
        .includes(query.toLocaleLowerCase())
    );
  });

  response.status(200);
  response.json(resultsWithQuery);
});

//API lấy thông tin một user (GET /users/:id)
app.get("/users/:id", async (request, response) => {
  const users = await readUsers();
  const userId = +request.params.id;
  const user = users.find((user) => user.id === userId);
  if (!user) {
    response.status(404);
    response.json({
      message: "User not found",
    });
    return;
  }
  response.status(200);
  response.json(user);
});

//API tạo mới user (POST /users)
app.post("/users", async (request, response) => {
  const users = await readUsers();
  const maxUser = users.reduce((acc, user) => {
    return acc.id > user.id ? acc : user;
  });
  const newUser = {
    id: maxUser.id + 1,
    ...request.body,
  };
  const checkDuplicateUser = users.filter(
    (user) =>
      user.email.toLocaleLowerCase() === newUser.email.toLocaleLowerCase(),
  );
  if (checkDuplicateUser.length) {
    response.status(400);
    response.json({
      message: "Email is already exits",
    });
    return;
  }
  users.push(newUser);
  await fs.writeFile(USERS_URL, JSON.stringify(users, null, 2));
  response.status(201);
  response.json(newUser);
});

//API cập nhật user (PUT /users/:id)
app.put("/users/:id", async (request, response) => {
  const users = await readUsers();
  const updateUser = request.body;
  const idUserUpdate = +request.params.id;
  const userIndex = users.findIndex((user) => {
    return user.id === idUserUpdate;
  });

  if (userIndex === -1) {
    response.status(404);
    response.json({
      message: "User not found",
    });
    return;
  }

  users[userIndex] = { ...users[userIndex], ...updateUser }; // dùng ... để Override thuộc tính trùng tên
  await fs.writeFile(USERS_URL, JSON.stringify(users, null, 2));
  response.status(200);
  response.json(users[userIndex]);
});

//API xóa user (DELETE /users/:id)
app.delete("/users/:id", async (request, response) => {
  const users = await readUsers();
  const idUserDelete = request.params.id;
  const isUserAlreadyExit = users.filter((user) => user.id === +idUserDelete);
  if (!isUserAlreadyExit.length) {
    response.status(404);
    response.json({
      message: "User not found",
    });
    return;
  }
  const newUsers = users.filter((user) => user.id !== +idUserDelete);
  await fs.writeFile(USERS_URL, JSON.stringify(newUsers, null, 2));
  response.status(200);
  response.json({
    message: "Deleted successfully",
  });
});

app.listen(3000, () => {
  console.log("Đang chạy với port 3000");
});
