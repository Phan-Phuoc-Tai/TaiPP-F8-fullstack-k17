//Bài tập 1
function isEven(n) {
  // Trả về true nếu n là số chẵn
  if (n % 2 === 0 && n > 0) {
    return true;
  }
  return false;
}
// console.log(isEven(3));
// Bài tập 2
function sumToN(n) {
  // Dùng vòng lặp for hoặc while để tính tổng
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}
// console.log(sumToN(10));
// Bài tập 3
function countDigits(n) {
  // Dùng while để đếm số chữ số
  // n = 1234 | count = 0
  // tmp = n % 10 = 4 | count  = 1
  // n = (1234 - 4) / 10 = 123
  let count = 0;
  let tmp = 0;
  while (n > 0) {
    tmp = n % 10;
    count++;
    n = (n - tmp) / 10;
  }
  return count;
}
// console.log(countDigits(1234));
//Bài tập 4
function factorial(n) {
  // Tính n! bằng for hoặc while
  // n = 5 --> result = 1 * 2 * 3 * 4 * 5
  let result = 1;
  while (n >= 1) {
    result *= n;
    n--;
  }
  return result;
}
// console.log(factorial(5));
//Bài tập 5
let tableHTML = `<table
      border="1"
      cellpadding="0"
      cellspacing="0"
      width="100%"
      height="100px"
    >`;
let result;
let output = "";
let td = "";
for (let row = 1; row <= 2; row++) {
  tableHTML += `<tr>`;
  for (let i = row === 1 ? 1 : 6; i <= row * 5; i++) {
    output = "";
    td = "";
    for (let j = 1; j <= 10; j++) {
      result = j * i;
      output = `${i} x ${j} = ${result}<br>`;
      td += `${output}`;
    }
    tableHTML += `<td>${td}</td>`;
  }
  tableHTML += `</tr>`;
}
tableHTML += `</table>`;

// document.body.innerHTML = tableHTML;
// Bài 6
function isPrime(n) {
  // Trả về true nếu n là số nguyên tố
  // > 1
  // chia hết cho 1 và chính nó
  if (n % 1 === 0 && n <= 1) {
    return false;
  }
  for (let i = 2; i < n; i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}

console.log(isPrime(7));
