/*
- input: từ 1 -> n
- số chính phương là số nguyên dương = bình phương của 1 số nguyên
- in ra số nguyên từ 1 -> n
- lấy các số bình phương 
- output: in ra số chính phương trong khoảng 1 -> n
*/
// in ra 1 -> 8
// for i = 1; i <= n; i++
// if i % 1 === 0
// if i <=1  ==> result += i; continue;
// else tmp = i ** 2;
// if tmp <= n ==> result += tmp;

function squareNumber(n) {
  let result = "";
  let tmp;
  for (let i = 1; i * i <= n; i++) {
    if (i % 1 === 0) {
      if (i <= 1) {
        result += `${i}`;
        continue;
      } else {
        tmp = i ** 2;
      }
      if (tmp <= n) {
        result += `,${tmp}`;
      }
    }
  }
  return `Số chính phương từ 1 đến ${n} là: ${result}`;
}
console.log(squareNumber(50));
