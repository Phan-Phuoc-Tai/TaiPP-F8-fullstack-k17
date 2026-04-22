//input:
const employees = [
  { id: 1, name: "An", projects: ["P1", "P2"] },
  { id: 2, name: "Bình", projects: ["P2", "P3"] },
  { id: 3, name: "Châu", projects: ["P1", "P3", "P4"] },
  { id: 4, name: "Dũng", projects: ["P4"] },
];

//output:
//Nhóm nhân viên theo dự án, sao cho mỗi dự án có danh sách nhân viên tham gia
const projects = (employees) => {
  let result = {};
  for (let value of employees) {
    for (let project of value.projects) {
      if (!result[project]) {
        result[project] = [];
        result[project].push(value.name);
      } else {
        result[project].push(value.name);
      }
    }
  }
  return result;
};
console.log(projects(employees));

//Tìm dự án có nhiều nhân viên tham gia nhất.
const mostMemberOfProject = (employees) => {
  const memberOfProject = Object.entries(projects(employees));
  const filterProject = memberOfProject.reduce((acc, cur) =>
    acc[acc.length - 1].length > cur[cur.length - 1].length ? acc : cur
  );
  const result = {
    project: filterProject[0],
    member: filterProject[1],
  };
  return result;
};
console.log(mostMemberOfProject(employees));
