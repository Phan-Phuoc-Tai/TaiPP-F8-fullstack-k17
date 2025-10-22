const PI = 3.14159;
let bankinh = 5;
let dientich = bankinh * bankinh * PI;
if (dientich < 0) {
  console.log(`Kết quả không hợp lệ`);
} else {
  console.log(`Diện tích hình tròn = ${dientich}`);
}
