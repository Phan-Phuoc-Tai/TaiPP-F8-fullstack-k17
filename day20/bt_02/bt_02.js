/*input:
const arr = [
  [1, 2],
  [3, 4],
  [5, 6],
];
// arr.flat(infinity)
*/
//output: newArr = [1, 2, 3, 4, 5, 6];

const arr = [
  [1, 2],
  [3, 4],
  [5, 6],
];
const newArr = arr.flat(Infinity);
console.log(newArr);
