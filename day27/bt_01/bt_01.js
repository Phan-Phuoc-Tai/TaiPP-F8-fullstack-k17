//input
function fetchUser() {
  return new Promise((resolve) => setTimeout(() => resolve("User Data"), 2000));
}
function fetchPosts() {
  return new Promise((resolve) => setTimeout(() => resolve("Post Data"), 3000));
}
function fetchComments() {
  return new Promise((resolve) =>
    setTimeout(() => resolve("Comment Data"), 1000)
  );
}

//output
//1. Dùng Promise.all để lấy kết quả từ cả 3 promises.
//2. Tính tổng thời gian chạy của cả 3 promises.
const promiseArr = [fetchUser(), fetchPosts(), fetchComments()];
let time = new Date();
let endTime;
let count = 0;
Promise.all(promiseArr).then((data) => {
  console.log(data);
  endTime = Date.now();
  console.log(
    `tổng thời gian chạy của cả 3 promises: ${Math.floor(
      (endTime - time) / 1000
    )}s`
  );
});
