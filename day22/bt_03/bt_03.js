//input:
const orders = [
  {
    orderId: 101,
    customer: "John",
    items: [{ name: "Laptop", price: 1000, quantity: 1 }],
  },
  {
    orderId: 102,
    customer: "Alice",
    items: [
      { name: "Phone", price: 500, quantity: 2 },
      { name: "Charger", price: 50, quantity: 3 },
    ],
  },
  {
    orderId: 103,
    customer: "Bob",
    items: [{ name: "Headphones", price: 200, quantity: 2 }],
  },
];

//output:
// Tính tổng tiền của từng đơn hàng
const totalOrders = (orders) => {
  let result = [];
  orders.forEach((order) => {
    let newObj = {};
    let total = 0;
    order.items.forEach((item) => {
      total += item.price * item.quantity;
    });
    if (!newObj.orderId) {
      newObj.orderId = order.orderId;
      newObj.customer = order.customer;
      newObj.totalOrders = total;
    }
    result.push(newObj);
  });
  return result;
};
console.log(totalOrders(orders));

// Tìm khách hàng có đơn hàng có tổng tiền cao nhất.
const maxCustomerOrder = (orders) => {
  let result = orders.reduce((acc, cur) => {
    return acc.totalOrders > cur.totalOrders ? acc : cur;
  });
  return result.customer;
};
console.log(maxCustomerOrder(totalOrders(orders)));

// Gộp danh sách tất cả các sản phẩm từ các đơn hàng, nhóm theo tên sản phẩm và tính tổng số lượng của mỗi sản phẩm.
/*
products = [
  { name: "Laptop", quantity: 1 }
  { name: "Phone", quantity: 2 },
  { name: "Charger", quantity: 3 },
  { name: "Headphones", quantity: 2 }
]
*/
const convertProducts = (orders) => {
  let newArr = [];
  orders.forEach((order) => {
    let items = order.items;
    items.forEach((item) => {
      let newObj = {};
      if (!newObj.name) {
        newObj.name = item.name;
        newObj.quantity = item.quantity;
      }
      newArr.push(newObj);
    });
  });
  return newArr;
};

const products = (products) => {
  let result = products.reduce((acc, cur) => {
    //Lọc trùng sản phẩm
    if (!acc.find((item) => item.name === cur.name)) {
      acc.push(cur);
    } else if (
      // tìm sản phẩm trùng sau đó tính tổng số lượng của sản phẩm đó
      acc.find((item) => {
        if (item.name === cur.name) {
          item.quantity += cur.quantity;
        }
      })
    );
    return acc;
  }, []);
  return result;
};
console.log(products(convertProducts(orders)));
