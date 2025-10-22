let regularPrice = 100000;
let salePrice = 68000;

// giá khuyến mãi = giá gốc - giá gốc * phần trăm giảm giá
// phần trăm giảm giá = ( giá gốc - giá khuyến mãi ) / giá gốc * 100
let discount = 0;
if (regularPrice > 0 && salePrice >= 0) {
  discount = ((regularPrice - salePrice) / regularPrice) * 100;
  console.log(`Phần trăm giảm giá là: ${discount}`);
} else {
  console.log(`Giá không hợp lệ`);
}
