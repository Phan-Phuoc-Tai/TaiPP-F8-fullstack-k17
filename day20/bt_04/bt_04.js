//input: const arr = [[3, 9], [1, 5, 10], [8]];
// arr.flat().reduce
//output: max = 10;

const arr = [[3, 9], [1, 5, 10], [8]];
const max = arr.flat(Infinity).reduce((acc, cur) => (acc > cur ? acc : cur));
console.log(max);
