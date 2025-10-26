/*
- input: a = 5 , b = 9;
- từ 5 -> 9 : even: 6, 8 ; odd: 5, 7, 9
 + for i = 5 ; i <= 9; i++
 + if i % 2 === 0; eveTotal += i; oddTotal += i;
- output: evenTotal = 14; oddTotal = 21;
*/

function getTotal(a, b) {
  let evenTotal = 0;
  let oddTotal = 0;
  for (let i = a; i <= b; i++) {
    if (i % 2 === 0) {
      evenTotal += i;
    } else {
      oddTotal += i;
    }
  }
  return `Tổng số lẻ: ${oddTotal}\nTổng số chẵn: ${evenTotal}`;
}
console.log(getTotal(5, 9));
