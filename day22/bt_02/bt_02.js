//input
const students = [
  { id: 1, name: "An", scores: { math: 8, english: 7, science: 9 } },
  { id: 2, name: "Bình", scores: { math: 6, english: 8, science: 7 } },
  { id: 3, name: "Châu", scores: { math: 9, english: 6, science: 8 } },
];
//output
//Tính điểm trung bình của từng học viên
const averageStudentScores = (students) => {
  let result = [];
  students.forEach((student) => {
    const newArr = Object.entries(student.scores);
    let averageScore =
      newArr.reduce((acc, cur) => (acc += cur[cur.length - 1]), 0) /
      newArr.length;
    let str = `Điểm trung bình của học viên ${
      student.name
    } là ${averageScore.toFixed(2)} `;
    result.push(str);
    student.averageScore = +averageScore.toFixed(2);
  });
  return result;
};
console.log(averageStudentScores(students));

//Tìm học viên có điểm trung bình cao nhất.
const maxStudent = (students) => {
  let result = students.reduce((acc, cur) => {
    return acc.averageScore > cur.averageScore ? acc : cur;
  });
  return `Học viên ${result.name} có điểm trung bình cao nhất`;
};
console.log(maxStudent(students));

//Sắp xếp danh sách học viên theo điểm trung bình giảm dần.
const sortStudent = (students) => {
  let result = students.sort((a, b) => b.averageScore - a.averageScore);
  return result;
};
console.log(sortStudent(students));
