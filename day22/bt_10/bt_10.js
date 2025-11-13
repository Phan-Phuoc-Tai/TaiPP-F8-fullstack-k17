//input:
const inventory = [
  { item: "Laptop", type: "import", quantity: 10 },
  { item: "Mouse", type: "import", quantity: 50 },
  { item: "Laptop", type: "export", quantity: 4 },
  { item: "Keyboard", type: "import", quantity: 20 },
  { item: "Mouse", type: "export", quantity: 10 },
];

//output:
// Tính số lượng tồn kho của từng sản phẩm.
const totalQuantity = (inventory) => {
  return inventory.reduce((acc, cur) => {
    const item = cur.item;
    if (!acc[item]) {
      acc[item] = { quantityRemain: 0 };
    }
    if (cur.type === "import") {
      acc[item].quantityRemain = Math.abs(
        acc[item].quantityRemain + cur.quantity
      );
    } else {
      acc[item].quantityRemain = Math.abs(
        acc[item].quantityRemain - cur.quantity
      );
    }
    return acc;
  }, {});
};
console.log(totalQuantity(inventory));

// Tìm sản phẩm có số lượng tồn kho cao nhất.
const maxRemain = (inventory) => {
  let quantityRemains = Object.entries(totalQuantity(inventory));
  const result = quantityRemains.reduce((acc, cur) =>
    acc[1].quantityRemain > cur[1].quantityRemain ? acc : cur
  );
  return result;
};
console.log(maxRemain(inventory));

// Nhóm danh sách nhập xuất theo sản phẩm, trong đó mỗi sản phẩm có lịch sử nhập xuất riêng
const mergeItem = (inventory) => {
  return inventory.reduce((acc, cur) => {
    const item = cur.item;
    if (!acc[item]) {
      acc[item] = [];
    }
    const condition = acc[item].find((value) => value.item === cur.item);
    if (!condition) {
      acc[item].push({
        type: cur.type,
        quantity: cur.quantity,
      });
    }
    return acc;
  }, {});
};
console.log(mergeItem(inventory));
