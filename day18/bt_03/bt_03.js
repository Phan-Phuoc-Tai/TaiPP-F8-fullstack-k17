//input: const nums = [3, 7, 2, 9, 12, 15, 18];
// dùng  for ... of
//output:
// - newArr = [12, 15, 18]
const nums = [3, 7, 2, 9, 12, 15, 18];
let newArr1 = [];
for (let num of nums) {
  if (num >= 10) {
    newArr1[newArr1.length] = num;
  }
}
console.log(newArr1);

// - newArr = [12, 15, 18]
let newArr2 = [];
for (let num of newArr1) {
  if (num % 3 === 0) {
    newArr2[newArr2.length] = num;
  }
}
console.log(newArr2);

// - newArr = [6, 14, 18, 30]
let newArr3 = [];
for (let num of nums) {
  if (num % 2 !== 0) {
    newArr3[newArr3.length] = num * 2;
  }
}
console.log(newArr3);
