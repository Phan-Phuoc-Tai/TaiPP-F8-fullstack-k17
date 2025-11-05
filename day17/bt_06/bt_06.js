//input: Xin chào Tài
// - Dùng indexOf(" ") -> index dấu cách đầu tiên
// - Dùng lastIndexOf(" ") -> index dấu cách cuối cùng
// - Dùng slice(0, indexOf) + slice(indexOf, lastIndexOf) + slice(lastIndexOf)
//Output: Tài chào xin
const str = "Xin chào F8";
const reverse = (str) => {
  if (str === "") {
    return `Chuỗi rỗng`;
  }
  let index = str.indexOf(" ");
  if (index === -1) {
    return str;
  }
  let lastIndex = str.lastIndexOf(" ");
  return (
    str.slice(lastIndex + 1) +
    str.slice(index, lastIndex + 1) +
    str.slice(0, index)
  );
};
console.log(reverse(str));
