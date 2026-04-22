// input: const fullname = 'tạ hoàng an'
/*
  Viết hoa ký tự đầu tiên
  Tìm index của dấu cách đầu tiên
  Viết hoa ký tự ở index + 1
*/
// output: "Tạ Hoàng An"

const fullname = "tạ hoàng an";
const convertFullname = (fullname) => {
  const words = fullname.split(" ");
  let newFullname = "";
  // let index = fullname.indexOf(" ");
  // newFullname += fullname.charAt(0).toUpperCase() + fullname.slice(1, index);
  // while (index !== -1) {
  //   fullname = fullname.slice(index).trim();
  //   index = fullname.indexOf(" ");
  //   newFullname +=
  //     " " + fullname.charAt(0).toUpperCase() + fullname.slice(1, index);
  // }
  // newFullname += fullname.slice(-index);
  for (let i = 0; i < words.length; i++) {
    newFullname += words[i].charAt(0).toUpperCase() + words[i].slice(1);
    if (i < words.length - 1) {
      newFullname += " ";
    }
  }
  return newFullname;
};
console.log(convertFullname(fullname));
