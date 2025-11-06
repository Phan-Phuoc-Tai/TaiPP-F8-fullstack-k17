/*input:
const arr = [
  [1, 2, 3],
  [2, 3, 4],
  [4, 5],
];
*/
// arr.flat().reduce()
//output: newArr = [1, 2, 3, 4, 5];

const arr = [
  [1, 2, 3],
  [2, 3, 4],
  [4, 5],
];
const newArr = arr.flat(Infinity).reduce((acc, cur) => {
  if (!acc.includes(cur)) {
    acc.push(cur);
  }
  return acc;
}, []);
console.log(newArr);
