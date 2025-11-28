//input
function retry(fn, times) {
  return new Promise((resolve, reject) => {
    const func = (fn) => {
      fn()
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          times--;
          if (times === 0) {
            reject(err);
          } else {
            func(fn);
          }
        });
    };
    func(fn);
  });
}
let failingPromise = () => {
  return new Promise((resolve, reject) => {
    Math.random() > 0.7 ? resolve("Thành công") : reject("Thất bại");
  });
};
retry(failingPromise, 3).then(console.log).catch(console.error);

//output
// Viết một hàm retry(fn, times) thực thi một Promise function fn, nếu thất bại thì thử lại tối đa times lần.
// - thực thi hàm fn -> trả về 1 promise
