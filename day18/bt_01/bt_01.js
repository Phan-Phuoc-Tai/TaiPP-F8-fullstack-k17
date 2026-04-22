//input: const arr = [1, 2, 3, 4, 5, 6];
// - Dùng for ... in
//Output
// - newArr = [1, 4, 9, 16, 25, 36]
const arr = [1, 2, 3, 4, 5, 6];
let newArr1 = [];
for (let value of arr) {
  newArr1[newArr1.length] = value ** 2;
}
console.log(newArr1);

// - newArr = [2, 4, 6]
let newArr2 = [];
for (let value of arr) {
  if (value % 2 === 0) {
    newArr2[newArr2.length] = value;
  }
}
console.log(newArr2);

// - newArr = [1, 9, 25]
let newArr3 = [];
for (let value of newArr1) {
  if (value % 2 !== 0) {
    newArr3[newArr3.length] = value;
  }
}
console.log(newArr3);
