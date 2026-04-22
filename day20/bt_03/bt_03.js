/*input:
const arr = [
  [1, 2, 3],
  [4, 5, 6],
];
// arr.flat
// arr.filter | arr.reduce
*/
// output : result = `Trong arr có n phần tử chẵn`

const arr = [
  [1, 2, 3],
  [4, 5, 6],
];
const result = arr.flat(Infinity).filter((value) => value % 2 === 0).length;
console.log(`Trong arr có ${result} phần tử chẵn`);
// const result = arr.flat(Infinity).reduce((acc, cur) => {
//   if (cur % 2 === 0) {
//     acc.push(cur);
//   }
//   return acc;
// }, []).length;
