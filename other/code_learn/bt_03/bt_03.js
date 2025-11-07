function greatestCommonPrimeDivisor(a, b) {
  let arrInteger = [];
  for (let i = 2; i <= Math.max(a, b); i++) {
    if (i === 2) {
      arrInteger.push(i);
    }
    if (i % 2 !== 0) {
      arrInteger.push(i);
    }
  }
  let arrCommon = arrInteger.filter(
    (value) => a % value === 0 && b % value === 0
  );
  if (arrCommon.length === 0) {
    return -1;
  }
  let result = arrCommon.reduce((acc, cur) => (acc > cur ? acc : cur));
  return result;
}
// tạo ra 1 array chứa số nguyên tố từ 2 -> b
// tạo ra 1 array chứa số nguyên tố khi a hoặc b % số đó === 0
// Tìm số lớn nhất trong mảng trên
