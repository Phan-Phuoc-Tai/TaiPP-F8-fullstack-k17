/*input
const users = [
  { name: "An", age: 25 },
  { name: "Bình", age: 30 },
  { name: "Chi", age: 22 },
];
// - for .. key .. in
// - Object.entries(users).reduce()
// - Object.entries(users).reduce()/ .length
// - 
*/
const users = [
  { name: "An", age: 25 },
  { name: "Bình", age: 30 },
  { name: "Chi", age: 22 },
];
//Output
//In ra tên của tất cả người dùng.
for (const index in users) {
  console.log(users[index].name);
}

//Tìm người có tuổi lớn nhất.
const maxUser = users.reduce((acc, cur) => {
  return acc.age > cur.age ? acc : cur;
});
const result = `${maxUser.name} là người có tuổi lớn nhất`;
console.log(result);
//Tính tuổi trung bình của tất cả người dùng.
const totalAgeUser = users.reduce((acc, cur) => {
  return (acc += cur.age);
}, 0);
const averageAge = Math.round(totalAgeUser / users.length);
console.log(averageAge);
