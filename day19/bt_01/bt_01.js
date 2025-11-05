/*input:
const myArr = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
*/

//output:
// - totalRows = [6, 15, 24]
const myArr = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
let totalRows = [];
myArr.forEach((value) => {
  let total = 0;
  for (let i = 0; i < value.length; i++) {
    total += value[i];
  }
  totalRows[totalRows.length] = total;
});
console.log(totalRows);

// - totalCols = [12, 15, 18]
let totalCols = [];
for (let i = 0; i < myArr.length; i++) {
  let total = 0;
  myArr.forEach((value, index) => {
    total += value[i];
  });
  totalCols[totalCols.length] = total;
}
console.log(totalCols);

// - filterTotal = [15, 24]
let filterTotal = totalRows.filter((value) => value > 10);
console.log(filterTotal);
