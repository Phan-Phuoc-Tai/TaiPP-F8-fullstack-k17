let n = 10;
let even = "";
let odd = "";
let letterFirst;

if (n >= 0) {
  for (let i = 0; i <= n; i++) {
    if (i % 1 === 0 && i % 2 == 0) {
      letterFirst = even === "" ? "" : ","; // Sử dụng toán tử 3 ngôi
      //letterFirst = even && ","; // Sử dụng toán tử lý luận && tìm falsy
      even = even + letterFirst + `${i}`;
    } else {
      // letterFirst = odd === "" ? "" : ",";
      letterFirst = odd && ",";
      odd = odd + letterFirst + `${i}`;
    }
  }
} else {
  for (let i = n; i <= 0; i++) {
    if (i % 1 === 0 && i % 2 == 0) {
      letterFirst = even === "" ? "" : ",";
      //letterFirst = even && ",";
      even = even + letterFirst + `${i}`;
    } else {
      // letterFirst = odd === "" ? "" : ",";
      letterFirst = odd && ",";
      odd = odd + letterFirst + `${i}`;
    }
  }
}

console.log(`Số chẵn: ${even}`);
console.log(`Số lẻ: ${odd}`);
