// input: nhận 3 tham số là 3 cạnh của 1 tam giác
/*
  a + b > c && a + c > b && b + c > a
*/
//output: trả về true / false

const isTriangle = (a, b, c) => {
  if ((isFinite(a) !== true, isFinite(b) !== true, isFinite(c) !== true)) {
    return `Không hợp lệ`;
  }
  if (a + b < c || a + c < b || b + c < a) {
    return false;
  }
  return true;
};
console.log(isTriangle(2, 4, 5));
