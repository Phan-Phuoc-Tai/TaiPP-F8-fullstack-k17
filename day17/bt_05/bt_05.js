//input: 1 chuỗi bất kì

//output:
// - true : nếu tất cả đều in hoa
// - false : TH còn lại

const str = "A B C";
const isUpperCase = (str) => {
  if (str === "") {
    return `Không có ký tự trong chuỗi`;
  }
  return str.trim() === str.trim().toUpperCase() ? true : false;
};
console.log(isUpperCase(str));
