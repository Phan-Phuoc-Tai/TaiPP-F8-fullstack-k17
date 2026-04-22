//input: weight, height
// BMI = weight / (height ** 2).
/* Output
- BMI < 18.5 -> return "Thiếu cân"
- 18.5 <= BMI < 23 -> return "Bình thường"
- 23 <= BMI < 25 -> return "Thừa cân"
- BMI >= 25 -> return "Béo phì"
- weight <= 0 || height <= 0 || weight, height không hợp lệ -> return "Dữ liệu không hợp lệ"
 */

const calcBMI = (weight, height) => {
  if (
    weight <= 0 ||
    height <= 0 ||
    typeof weight !== "number" ||
    typeof height !== "number"
  ) {
    return "Dữ liệu không hợp lệ";
  }
  // let BMI = weight / height ** 2;
  let BMI = weight / (height * height);
  if (BMI < 18.5) {
    return "Thiếu cân";
  }
  if (BMI < 23) {
    return "Bình thường";
  }
  if (BMI < 25) {
    return "Thừa cân";
  }
  return "Béo phì";
};
console.log(calcBMI(80, 1.65));
