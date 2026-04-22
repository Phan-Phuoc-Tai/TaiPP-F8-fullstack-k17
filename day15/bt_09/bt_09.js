const PRICE_1 = 1.678;
const PRICE_2 = 1.734;
const PRICE_3 = 2.014;
const PRICE_4 = 2.536;
const PRICE_5 = 2.834;
const PRICE_6 = 2.927;
const KWH_1 = 50;
const KWH_2 = 100;
const KWH_3 = 200;
const KWH_4 = 300;
const KWH_5 = 400;

let maxRank_1 = KWH_1 * PRICE_1; //Giá của số kwh kịch khung 50
let maxRank_2 = (KWH_2 - KWH_1) * PRICE_2; //Giá của số kwh kịch khung 100
let maxRank_3 = (KWH_3 - KWH_2) * PRICE_3; //Giá của số kwh kịch khung 200
let maxRank_4 = (KWH_4 - KWH_3) * PRICE_4; //Giá của số kwh kịch khung 300
let maxRank_5 = (KWH_5 - KWH_4) * PRICE_5; //Giá của số kwh kịch khung 400
let kwhConsume = 500;
let total = 0;

if (kwhConsume > 0) {
  if (kwhConsume <= KWH_1) {
    total = kwhConsume * PRICE_1;
  } else if (kwhConsume <= KWH_2) {
    total = maxRank_1 + (kwhConsume - KWH_1) * PRICE_2;
  } else if (kwhConsume <= KWH_3) {
    total = maxRank_1 + maxRank_2 + (kwhConsume - KWH_2) * PRICE_3;
  } else if (kwhConsume <= KWH_4) {
    total = maxRank_1 + maxRank_2 + maxRank_3 + (kwhConsume - KWH_3) * PRICE_4;
  } else {
    total =
      maxRank_1 +
      maxRank_2 +
      maxRank_3 +
      maxRank_4 +
      (kwhConsume - KWH_4) * PRICE_5;
    if (kwhConsume > KWH_5) {
      total =
        maxRank_1 +
        maxRank_2 +
        maxRank_3 +
        maxRank_4 +
        maxRank_5 +
        (kwhConsume - KWH_5) * PRICE_6;
    }
  }
  console.log(total);
} else {
  console.log(`Số kwhConsume không hợp lệ`);
}
