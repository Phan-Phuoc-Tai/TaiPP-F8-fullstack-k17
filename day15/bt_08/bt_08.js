let a = 4;
let b = 8;
console.log(`Ban đầu:`, `a = ${a}`, `b = ${b}`);

// a = 4, b = 8
// a = a + b = 4 + 8 = 12
// b = a - b = 12 - 8 = 4
// a = a - b = 12 - 4 = 8
a = a + b;
b = a - b;
a = a - b;
console.log(`Hoán vị lần 1:`, `a = ${a}`, `b = ${b}`);

// a = 8 , b = 4
// a = a - b = 8 - 4 = 4
// b = b + a = 4 + 4 = 8
// a = b - a = 8 - 4 = 4
a = a - b;
b = b + a;
a = b - a;
console.log(`Hoán vị lần 2:`, `a = ${a}`, `b = ${b}`);

// a = 4 , b = 8
// a = a * b = 4 * 8 = 32
// b = a / b = 32 / 8 = 4
// a = a / b = 32 / 4 = 8
a = a * b;
b = a / b;
a = a / b;
console.log(`Hoán vị lần 3:`, `a = ${a}`, `b = ${b}`);

// a = 8, b = 4
// a = a / b = 8 / 4 = 2
// b = b * a = 4 * 2 = 8
// a = b / a = 8 / 2 = 4
a = a / b;
b = b * a;
a = b / a;
console.log(`Hoán vị lần 4:`, `a = ${a}`, `b = ${b}`);
