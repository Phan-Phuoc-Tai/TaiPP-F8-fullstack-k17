//input:const arr = [[1, 2, 3], [4, 5], [6]];
// arr.flat(Infinity) = [1, 2, 3, 4, 5, 6];
// arr.reduce()
//output: totalArr = 21;

const arr = [[1, 2, 3], [4, 5], [6]];
const totalArr = arr.flat(Infinity).reduce((acc, cur) => acc + cur);
console.log(totalArr);
