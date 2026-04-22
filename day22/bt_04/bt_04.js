//input:
const employees = [
  { id: 1, name: "Mai", department: "IT", salary: 1200 },
  { id: 2, name: "Nam", department: "HR", salary: 800 },
  { id: 3, name: "Hà", department: "IT", salary: 1500 },
  { id: 4, name: "Linh", department: "Marketing", salary: 900 },
  { id: 5, name: "Phúc", department: "IT", salary: 1100 },
];
//output:
//Tính tổng lương của từng phòng ban.
const departments = (employees) => {
  let newArr = [];
  employees.forEach((item) => {
    let newObj = {};
    if (!newObj.department) {
      newObj.department = item.department;
      newObj.totalSalary = item.salary;
    }
    newArr.push(newObj);
  });
  return newArr;
};
const totalSalaryDepartment = (employees) => {
  let departmentArr = departments(employees);
  let result = departmentArr.reduce((acc, cur) => {
    if (!acc.find((item) => item.department === cur.department)) {
      acc.push(cur);
    } else if (
      acc.find((item) => {
        if (item.department === cur.department) {
          item.totalSalary += cur.totalSalary;
        }
      })
    );
    return acc;
  }, []);
  return result;
};
console.log(totalSalaryDepartment(employees));

//Tìm nhân viên có mức lương cao nhất trong mỗi phòng ban.
const mergeDepartments = (employees) => {
  let result = [];
  let conditions = [];
  //tìm tất cả phòng ban
  employees.reduce((acc, cur) => {
    if (!acc.find((item) => item.department === cur.department)) {
      acc.push(cur);
      conditions.push(cur.department);
    }
    return acc;
  }, []);
  //tìm nhân viên trong từng phòng ban và thêm vào phòng tương ứng
  conditions.forEach((value) => {
    let newArr = employees.filter((item) => {
      return item.department === value;
    });
    result.push(newArr);
  });
  return result;
};
//tìm ra nhân viên có lương cao nhất ở mỗi phòng ban
const highestSalaryInDepartment = (employees) => {
  let employeeArr = mergeDepartments(employees);
  let result = [];
  employeeArr.forEach((item) => {
    let highestSalary = item.reduce((acc, cur) =>
      acc.salary > cur.salary ? acc : cur
    );
    result.push(highestSalary);
  });
  return result;
};
console.log(highestSalaryInDepartment(employees));

//Chuyển đổi dữ liệu về dạng object, trong đó key là tên phòng ban, value là mảng nhân viên trong phòng ban đó.
const newDepartments = (employees) => {
  let newObj = {};
  employees.forEach((item) => {
    if (!newObj[item.department]) {
      newObj[item.department] = [];
    }
    if (!newObj[item.department].includes(item.name)) {
      newObj[item.department].push(item.name);
    }
  });
  return newObj;
};
console.log(newDepartments(employees));
