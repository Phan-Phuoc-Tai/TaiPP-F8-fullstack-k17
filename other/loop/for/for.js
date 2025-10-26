// // cơ bản
// // Bài 1
// let n = 10;
// for (let i = 1; i <= n; i++) {
//   console.log(i);
// }

// // Bài 2
// // dùng n = 10 ở bài 1
// let total = 0;
// for (let i = 1; i <= n; i++) {
//   total += i;
// }
// console.log(`Tổng các số = ${total}`);

// // Bài 3
// let m = 100;
// let even = "";
// let letterFirst;
// let counts = 0;
// for (let i = 1; i <= m; i++) {
//   if (i % 2 === 0) {
//     // letterFirst = even === "" ? "" : ",";
//     letterFirst = even && ",";
//     even += `${letterFirst} ${i}`;
//     counts++;
//   }
// }
// console.log(`Số chẵn: ${even}`);
// console.log(`Có ${counts} số chẵn`);

// // Bài 4
// // dùng n = 10 ở bài 1
// let factorial = 1;
// for (let i = 1; i <= n; i++) {
//   factorial *= i;
// }
// console.log(factorial);

// // Bài 5
// // dùng n = 10 ở bài 1
// let results;
// let multiply = 1;
// for (let i = 1; i <= n; i++) {
//   results = "";
//   for (let j = 1; j <= n; j++) {
//     multiply = i * j;
//     results += `
//     ${i} x ${j} = ${multiply}`;
//     // results += `${i} x ${j} = ${multiply}\n`;
//   }
//   console.log(results);
// }

// // Bài 6
// // dùng n = 10 ở bài 1
// // n = 2, i chạy từ 1 ~ 2
// // i = 1 thì j chạy từ 1
// // i = 2 thì j chạy từ 1 ~ 2
// // nếu 2 % 1  === 0 | count = 1
// // nếu 2 % 2 === 0 | count = 2
// // Nếu count = 2 thì số đó là số nguyên tố

// let count;
// for (let i = 1; i <= n; i++) {
//   count = 0;
//   for (let j = 1; j <= i; j++) {
//     if (i % j === 0) {
//       count++;
//     }
//   }
//   if (count === 2) {
//     console.log(`Số ${i} là số nguyên tố`);
//   } else {
//     console.log(`Số ${i} không phải là số nguyên tố`);
//   }
// }

// // bài 7
// let t = 4;
// let triangle = "";
// for (let i = 1; i <= t; i++) {
//   for (let j = 1; j <= i; j++) {
//     triangle += `${j}`;
//   }
//   triangle += `\n`;
// }
// console.log(triangle);

// // Bài 8
// // chưa học về chuỗi, bó tay

// // In ra bàn cờ vua
// let totals = 8;
// let row = "";
// let col = "";
// let cell;
// for (let i = 1; i <= totals; i++) {
//   col = "";
//   if (i % 2 === 0) {
//     for (j = 1; j <= totals; j++) {
//       if (j % 2 === 0) {
//         col += "white" + " ";
//       } else {
//         col += "black" + " ";
//       }
//     }
//     row += `${col}\n`;
//   } else {
//     for (j = 1; j <= totals; j++) {
//       if (j % 2 === 0) {
//         col += "black" + " ";
//       } else {
//         col += "white" + " ";
//       }
//     }
//     row += `${col}\n`;
//   }
// }
// console.log(row);

// // row - col 1~8 phải xong

function factorSum(n) {
  while (n !== solve(n)) {
    n = solve(n); // lúc này n = 9;
    console.log(n);
  }
  return n;
}

function solve(n) {
  let tmp = 2;
  let sum = 0;
  while (n > 1) {
    while (n % tmp === 0) {
      sum += tmp;
      n /= tmp;
    }
    tmp++;
  }
  return sum;
}

factorSum(24);
