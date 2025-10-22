let a = 7;
let b = 3;

let total = a + b; // Tổng
let minus = a - b; // Hiệu
let multiply = a * b; // Tích
let divide = a / b; //Thương
let remainder = a % b; // Chia lấy dư

console.log(`Tổng 2 số = ${total}`);
console.log(`Hiệu 2 số = ${minus}`);
console.log(`Tích 2 số = ${multiply}`);
if (b !== 0) {
  console.log(`Thương 2 số = ${divide}`);
  console.log(`Số dư 2 số = ${remainder}`);
} else {
  console.log(`Số ${b} là số bị chia không hợp lệ`);
  console.log(`Số ${b} là số không thể chia lấy dư`);
}
