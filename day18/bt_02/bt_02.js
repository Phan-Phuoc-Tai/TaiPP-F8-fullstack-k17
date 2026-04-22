//input: const names = [" hoang ", "AN", " f8 ", "Education"]
/*
  - Dùng for ... in : lấy index
  - names[index].trim().toLowerCase
*/
//output:  ["hoang", "an", "f8", "education"]

const names = [" hoang ", "AN", " f8 ", "Education"];
let newNames = [];
for (let index in names) {
  newNames[newNames.length] = names[index].trim().toLowerCase();
}
console.log(newNames);

/*
  - Dùng for ... in : lấy index
  - newNames.[index].charAt(0).toUppercase
*/
//output: ['Hoang', 'An', 'F8', 'Education']

let newUpperCase = [];
for (let index2 in newNames) {
  newUpperCase[newUpperCase.length] =
    newNames[index2].charAt(0).toUpperCase() + newNames[index2].slice(1);
}
console.log(newUpperCase);
