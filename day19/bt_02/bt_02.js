/* input
  const myArr = [
  ["hello", "world"],
  ["javascript", "php"],
  ["css", "html"],
];
*/

// output
// - newArr1 = myArr.toUpperCase()
const myArr = [
  ["hello", "world"],
  ["javascript", "php"],
  ["css", "html"],
];
let newArr1 = [];
myArr.forEach((value) => {
  let arr = [];
  for (i = 0; i < value.length; i++) {
    arr[arr.length] = value[i].toUpperCase();
  }
  newArr1[newArr1.length] = arr;
});
console.log(newArr1);

// - newArr2 = myArr.(value.length > 4)
let newArr2 = [];
myArr.forEach((value) => {
  for (let i = 0; i < value.length; i++) {
    if (value[i].length > 4) {
      newArr2[newArr2.length] = value[i];
    }
  }
});
console.log(newArr2);

// - newArr3 = ["hello", "world", "javascript", "php", "css", "html"]
let newArr3 = [];
myArr.forEach((value) => {
  for (let i = 0; i < value.length; i++) {
    newArr3[newArr3.length] = value[i];
  }
});
console.log(newArr3);
