/*
- input: n = 4 là số nguyên
- biến sum = 0;
- biến tmp = 1
- loop : for i = 1 > ++tmp; sum += i * tmp = 1 * 2 
- output: S = 1*2 + ... + 4*(4+1)
*/

function getTotal(n) {
  // let sum = 0;
  // let tmp = 1;
  //   if (n % 1 !== 0) {
  //     return `Số ${n}: không phải là số nguyên`;
  //   }
  //   for (let i = 1; i <= n; i++) {
  //     sum += i * ++tmp;
  //   }
  //   return `n = ${n}\nGiá trị biểu thức: S = ${sum}`;
  if (!Number.isInteger(n) || n < 1) {
    return `Số ${n}: không phải là số nguyên dương`;
  }
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i * (i + 1);
  }
  return sum;
}

console.log(getTotal(4));
