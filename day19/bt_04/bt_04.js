/*Input:
const scores = [
  [8, 9, 7], // học sinh 1
  [6, 5, 7], // học sinh 2
  [10, 9, 8], // học sinh 3
];
*/

// output
// - averageScores = [8, 6, 9]
const scores = [
  [8, 9, 7], // học sinh 1
  [6, 5, 7], // học sinh 2
  [10, 9, 8], // học sinh 3
];
let averageScores = [];
scores.forEach((value, index) => {
  let average = 0;
  for (let i = 0; i < value.length; i++) {
    average += value[i];
  }
  index += 1;
  averageScores[averageScores.length] = average / value.length;
});
console.log(averageScores);

// - goodStudent = [>=8]
let goodStudent = [];
averageScores.forEach((average, index) => {
  index += 1;
  if (average >= 8) {
    goodStudent[
      goodStudent.length
    ] = `Học sinh ${index} có điểm TB >= 8 là ${average}`;
  }
});
console.log(goodStudent);

// - newArr = [all + 1 nếu chưa = 10]
let upScores = [];
scores.forEach((value) => {
  let max = 10;
  let arr = [];
  for (let i = 0; i < value.length; i++) {
    if (value[i] === 10) {
      arr[arr.length] = value[i];
    }
    if (value[i] < 10) {
      arr[arr.length] = value[i] + 1;
    }
  }
  upScores[upScores.length] = arr;
});
console.log(upScores);
