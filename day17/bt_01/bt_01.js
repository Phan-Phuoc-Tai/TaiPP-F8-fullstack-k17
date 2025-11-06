// tính tổng số fibonacci
// input : số n
/*
- hàm lấy ra số fibonacci thứ n | số: 1,1,2,3,5,8,13,21,..
- hàm tính tổng sumFibonacci
*/
// output : tổng n số fibonacci

function fibonacci(n) {
  if (n === 1 || n === 2) {
    return 1;
  }
  let result = 0;
  result = fibonacci(n - 1) + fibonacci(n - 2);
  return result;
}

const sumFibonacci = (n) => {
  if (!Number.isInteger(n) || n <= 0) {
    return `Số ${n}: không hợp lệ`;
  }
  let sum = 0;
  for (let i = n; i > 0; i--) {
    sum += fibonacci(i);
  }
  return sum;
};
console.log(sumFibonacci(5));
