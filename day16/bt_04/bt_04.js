/*
- input: số nguyên tố từ 1 -> n | n = 10
- viết hàm isPrime kiểm tra số nguyên tố
- liệt kê có bao nhiêu số nguyên tố từ 1 -> 10
- viết hàm getTotalPrime để tính tổng
- output:
  + isPrime(n): Kiểm tra số nguyên tố
  + getTotalPrime(n): Tính tổng các số nguyên tố từ 1 -> n
*/

// function isPrime(n) {
//   if (n % 1 !== 0 || n <= 1) {
//     return false;
//   }
//   for (let i = 2; i < n; i++) {
//     if (n % i === 0) {
//       return false;
//     }
//   }
//   return true;
// }

// function getTotalPrime(n) {
//   let sum = 0;
//   if (n <= 1) {
//     return `Số ${n} không hợp lệ`;
//   }
//   for (let j = 1; j <= n; j++) {
//     if (isPrime(j) === true) {
//       sum += j;
//     }
//   }
//   return `Tổng các số nguyên tố từ 1 đến ${n} = ${sum}`;
// }
// console.log(getTotalPrime(10));

function isPrime(n) {
  if (!Number.isInteger(n) || n <= 1) {
    return false;
  }
  if (n === 2) {
    return true;
  }
  if (n % 2 === 0) {
    return false;
  }
  for (let i = 3; i * i <= n; i += 2) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}

function getTotalPrime(n) {
  if (!Number.isInteger(n) || n < 2) {
    return 0;
  }
  let total = 0;
  for (let i = 2; i <= n; i++) {
    if (isPrime(i) === true) {
      total += i;
    }
  }
  return total;
}

console.log(getTotalPrime(10));
