/*
- input: 4298
- hàm solve(4298)
  + phân tách thành từng số 4, 2, 9, 8
  + biến count đếm số lần phân tách
  + nếu count = 4 thì sẽ chuyển thành chữ ngàn
  + nếu count = 3 thì chuyển thành chừ trăm
  + dùng switch case để chuyển đổi số thành chữ
- output: hàm numberToString(4298) "bốn ngàn hai trăm chín tám"
*/

function numberChangeString(m) {
  switch (m) {
    case 0:
      return "không";

    case 1:
      return "một";

    case 2:
      return "hai";

    case 3:
      return "ba";

    case 4:
      return "bốn";

    case 5:
      return "năm";

    case 6:
      return "sáu";

    case 7:
      return "bảy";

    case 8:
      return "tám";

    case 9:
      return "chín";
  }
}

function unitToString(count) {
  switch (count) {
    case 2:
      return " mươi ";
    case 3:
      return " trăm ";
    case 4:
      return "ngàn ";
    default:
      return "";
  }
}

// hàm chuyển đơn vị sang chữ
function changeUnit(n) {
  let unit = n % 10;
  let result;
  if (n < 10) {
    result = unit !== 0 ? `${numberChangeString(unit)}` : `không`;
    return result;
  }
  switch (unit) {
    case 0:
      return n % 10 === 0 ? "" : `mươi`;
    case 1:
      return n === 11 ? `một` : `mốt`;
    case 4:
      return n === 14 ? `bốn` : `tư`;
    case 5:
      return `lăm`;
    default:
      return `${numberChangeString(unit)}`;
  }
}
// hàm chuyển hàng chục sang chữ
function changeDozen(n) {
  let unit = n % 10;
  let count = 2;
  let result;
  let dozen = (n - unit) / 10;

  if (n < 100) {
    if (dozen === 1) {
      return `mười `;
    }
    result =
      dozen !== 0 ? `${numberChangeString(dozen)}${unitToString(count)}` : ``;
    return result;
  }
}

// hàm chuyển hàng trăm sang chữ
function changeHundred(n) {
  let dozen = n % 100;
  let count = 3;
  let result;
  let hundred = (n - dozen) / 100;
  result = `${numberChangeString(hundred)}${unitToString(count)}`;
  return result;
}

// hàm chuyển hàng ngàn sang chữ
function changeThousand(n) {
  let hundred = n % 1000;
  let count = 4;
  let result;
  let thousand = (n - hundred) / 1000;
  result = `${numberChangeString(thousand)} ${unitToString(count)}`;
  return result;
}

function numberToString(n) {
  let result = ``;
  let thousand = ``;
  let hundred = ``;
  let dozen = ``;
  let unit = ``;
  if (n < 0 || n > 9999) {
    return `Số ${n} không thỏa mãn điều kiện`;
  }
  //kiểm tra số 0
  if (n === 0) {
    return `không`;
  }
  //kiểm tra số 1000, 2000 ...
  if (n % 1000 === 0) {
    return (thousand = `${changeThousand(n)}`);
  }
  if (n > 1000) {
    thousand = `${changeThousand(n)}`;
    n = n % 1000;
    hundred = `${changeHundred(n)}`;
    if (n % 100 === 0) {
      return (result = `${thousand}${hundred}`);
    }
    n = n % 100;
    dozen = `${changeDozen(n)}`;
    if (n < 10 && hundred !== "") {
      dozen = `lẻ `;
      unit = `${changeUnit(n)}`;
    } else {
      unit = `${changeUnit(n)}`;
    }
    result = `${thousand}${hundred}${dozen}${unit}`;
    return result;
  }
  //kiểm tra số 100, 200 ...
  if (n % 100 === 0) {
    return (hundred = `${changeHundred(n)}`);
  }
  if (n > 100) {
    hundred = `${changeHundred(n)}`;
    n = n % 100;

    dozen = `${changeDozen(n)}`;
    if (n < 10) {
      dozen = `lẻ `;
      unit = `${changeUnit(n)}`;
    } else {
      unit = `${changeUnit(n)}`;
    }
    result = `${hundred}${dozen}${unit}`;
    return result;
  }
  if (n > 10) {
    dozen = `${changeDozen(n)}`;
    unit = `${changeUnit(n)}`;
    result = `${dozen}${unit}`;
    return result;
  }
  //kiểm tra số 10, 20...
  if (n % 10 === 0) {
    return (dozen = `${changeDozen(n)}`);
  }
  if (n < 10) {
    return (unit = `${changeUnit(n)}`);
  }
}
console.log(numberToString(8386));
