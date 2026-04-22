//input
const products = [
  { id: 1, name: "Laptop", category: "Electronics", price: 1200 },
  { id: 2, name: "Phone", category: "Electronics", price: 800 },
  { id: 3, name: "Shirt", category: "Clothing", price: 40 },
  { id: 4, name: "Shoes", category: "Clothing", price: 60 },
  { id: 5, name: "Headphones", category: "Electronics", price: 150 },
];
//output
/* Lọc ra các sản phẩm thuộc danh mục "Electronics".
[
  { id: 1, name: "Laptop", category: "Electronics", price: 1200 },
  { id: 2, name: "Phone", category: "Electronics", price: 800 },
  { id: 5, name: "Headphones", category: "Electronics", price: 150 },

]
*/
const electronics = (products, condition) => {
  const newArr = [];
  products.forEach((item) => {
    if (item.category === condition) {
      newArr.push(item);
    }
  });
  return newArr;
};
console.log(electronics(products, "Electronics"));

// Tính tổng giá của tất cả sản phẩm trong danh mục "Electronics". = 2150
const totalElectronics = (electronics) => {
  const result = electronics.reduce((acc, cur) => (acc += cur.price), 0);
  return result;
};
console.log(totalElectronics(electronics(products, "Electronics")));

/* Chuyển đổi mảng sản phẩm thành một object, trong đó key là category, value là mảng các sản phẩm thuộc danh mục đó.
  newProduct = {
    Electronics : ["Laptop", "Phone", "Headphones"],
    Clothing : ["Shirt", "Shoes"]
  }
 */
const newProduct = (products) => {
  const newObj = {};
  products.forEach((item) => {
    if (!newObj[item.category]) {
      newObj[item.category] = [];
    }
    if (!newObj[item.category].includes(item.name)) {
      newObj[item.category].push(item);
    }
  });
  return newObj;
};

console.log(newProduct(products));
