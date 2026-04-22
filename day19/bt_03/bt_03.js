/* input
const myArr = [
  [2, 4, 6],
  [8, 10, 12],
  [14, 16, 18],
];

*/

//output:
// - newArr = [2, 10, 18]
const myArr = [
  [2, 4, 6],
  [8, 10, 12],
  [14, 16, 18],
];
let newArr1 = [];
myArr.forEach((value, index) => {
  let arr;
  for (i = index; i < value.length; i++) {
    arr = value[index];
  }
  newArr1[newArr1.length] = arr;
});
console.log(newArr1);

// - newArr = [6, 10, 14]
let newArr2 = [];
myArr.forEach((value, index) => {
  let i = value.length - 1 - index;
  newArr2[newArr2.length] = value[i];
});
console.log(newArr2);

// - total
let total = 0;
newArr1.forEach((value) => (total += value));
newArr2.forEach((value) => (total += value));
console.log(total);
