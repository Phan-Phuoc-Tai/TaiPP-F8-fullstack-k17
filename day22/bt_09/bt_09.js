//input:
const transactions = [
  { id: 1, account: "A", type: "deposit", amount: 1000 },
  { id: 2, account: "B", type: "withdraw", amount: 200 },
  { id: 3, account: "A", type: "withdraw", amount: 500 },
  { id: 4, account: "C", type: "deposit", amount: 700 },
  { id: 5, account: "B", type: "deposit", amount: 300 },
];

//output:
// Tính số dư cuối cùng của từng tài khoản.
const remain = (transactions) => {
  return transactions.reduce((acc, cur) => {
    const account = cur.account;
    if (!acc[account]) {
      acc[account] = { remainAmount: 0 };
    }
    acc[account].remainAmount = Math.abs(
      acc[account].remainAmount - cur.amount
    );
    return acc;
  }, {});
};
console.log(remain(transactions));

// Tìm tài khoản có số dư cao nhất.
const maxRemain = (transactions) => {
  const remainAmount = Object.entries(remain(transactions));
  const result = remainAmount.reduce((acc, cur) =>
    acc[1].remainAmount > cur[1].remainAmount ? acc : cur
  );
  return result;
};
console.log(maxRemain(transactions));

// Nhóm các giao dịch theo tài khoản, trong đó mỗi tài khoản có danh sách giao dịch của riêng nó.
const mergeAccount = (transactions) => {
  return transactions.reduce((acc, cur) => {
    const account = cur.account;
    if (!acc[account]) {
      acc[account] = [];
    }
    const condition = acc[account].find((item) => item.account === cur.account);
    if (!condition) {
      acc[account].push({
        id: cur.id,
        type: cur.type,
        amount: cur.amount,
      });
    }
    return acc;
  }, {});
};
console.log(mergeAccount(transactions));
