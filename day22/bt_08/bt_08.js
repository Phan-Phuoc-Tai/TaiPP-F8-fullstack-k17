//input:
const reviews = [
  { productId: "P1", userId: "U1", rating: 5 },
  { productId: "P2", userId: "U2", rating: 4 },
  { productId: "P1", userId: "U3", rating: 3 },
  { productId: "P3", userId: "U1", rating: 4 },
  { productId: "P2", userId: "U3", rating: 2 },
  { productId: "P1", userId: "U2", rating: 4 },
];

//output:
// Tính điểm trung bình đánh giá của mỗi sản phẩm.
const averageRating = (reviews) => {
  const newObj = reviews.reduce((acc, cur) => {
    const productId = cur.productId;
    if (!acc[productId]) {
      acc[productId] = { totalRating: 0, quantity: 0 };
    }
    acc[productId].totalRating += cur.rating;
    acc[productId].quantity++;
    return acc;
  }, {});
  const newArr = Object.entries(newObj).map((value) => {
    let result = [];
    result.push(value[0]);
    result.push({ averageRating: value[1].totalRating / value[1].quantity });
    return result;
  });
  return Object.fromEntries(newArr);
};
console.log(averageRating(reviews));

// Tìm sản phẩm có điểm trung bình cao nhất.
const bestAverageRating = (reviews) => {
  let averageRatingArr = Object.entries(averageRating(reviews));
  let result = [];
  averageRatingArr.reduce((acc, cur) => {
    if (acc[1].averageRating > cur[1].averageRating) {
      result.push(acc);
    } else if ((acc[1].averageRating = cur[1].averageRating)) {
      result.push(cur);
    }
    return acc;
  });
  return Object.fromEntries(result);
};
console.log(bestAverageRating(reviews));
// Nhóm danh sách đánh giá theo productId, trong đó mỗi sản phẩm có danh sách đánh giá của từng người dùng.
const mergeProductId = (reviews) => {
  return reviews.reduce((acc, cur) => {
    const productId = cur.productId;
    if (!acc[productId]) {
      acc[productId] = [];
    }
    const condition = acc[productId].find(
      (item) => item.productId === cur.productId
    );
    if (!condition) {
      acc[productId].push({
        userId: cur.userId,
        rating: cur.rating,
      });
    }
    return acc;
  }, {});
};
console.log(mergeProductId(reviews));
