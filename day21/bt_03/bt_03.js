/*input
const students = [
  { name: "Lan", scores: [8, 9, 7] },
  { name: "Huy", scores: [6, 5, 7] },
  { name: "Minh", scores: [9, 8, 10] },
];
*/
const students = [
  { name: "Lan", scores: [8, 9, 7] },
  { name: "Huy", scores: [6, 5, 7] },
  { name: "Minh", scores: [9, 8, 10] },
];
//output
// - Tính điểm trung bình của từng học sinh.
const result = [];
for (const index in students) {
  const studentScores = students[index].scores;
  const averageScore =
    studentScores.reduce((acc, cur) => (acc += cur), 0) / studentScores.length;
  students[index].averageScore = averageScore;
  const str = `Điểm trung bình của ${students[index].name} là ${averageScore}`;
  result.push(str);
}
console.log(result);

// - Trả về danh sách học sinh đạt loại giỏi (điểm TB >= 8).
const goodStudents = students.filter((student) => student.averageScore >= 8);
const listStudentName = goodStudents.map((item) => {
  return item.name;
});
console.log(listStudentName);

// - Sắp xếp học sinh theo điểm trung bình giảm dần.
const sortStudents = students.sort((a, b) => {
  if (a.averageScore > b.averageScore) {
    return -1;
  }
});
for (const index in sortStudents) {
  delete sortStudents[index].averageScore;
}
console.log(sortStudents);
