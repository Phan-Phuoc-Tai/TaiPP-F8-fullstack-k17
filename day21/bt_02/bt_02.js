/*input
const products = [
  { name: "Laptop", price: 15000000 },
  { name: "Mouse", price: 250000 },
  { name: "Keyboard", price: 800000 },
];
*/
//for .. key .. in
//products.reduce()
const products = [
  { name: "Laptop", price: 15000000 },
  { name: "Mouse", price: 250000 },
  { name: "Keyboard", price: 800000 },
];
//output
// Tạo mảng mới chỉ chứa tên sản phẩm.
const productsNameArr = [];
for (const index in products) {
  //Lọc trùng tên sản phẩm
  if (!productsNameArr.includes(products[index].name)) {
    productsNameArr.push(products[index].name);
  }
}
console.log(productsNameArr);

// Tính tổng giá trị tất cả sản phẩm.
const totalProducts = products.reduce((acc, cur) => acc + cur.price, 0);
console.log(totalProducts);

// Lọc ra sản phẩm có giá lớn hơn 1 triệu.
const productMillion = products.reduce((acc, cur) => {
  return acc.price > cur.price ? acc : cur;
});
const result = `${productMillion.name} là sản phẩm có giá lớn hơn 1 triệu`;
console.log(result);
