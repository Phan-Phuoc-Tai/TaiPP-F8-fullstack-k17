/*input
const posts = [
  {
    id: 1,
    title: "JavaScript cơ bản",
    tags: ["js", "basic"],
    comments: [
      { user: "An", text: "Hay quá!" },
      { user: "Bình", text: "Rất dễ hiểu" },
    ],
  },
  {
    id: 2,
    title: "Học React không khó",
    tags: ["react", "js"],
    comments: [{ user: "Chi", text: "Cảm ơn chia sẻ" }],
  },
];
 */
const posts = [
  {
    id: 1,
    title: "JavaScript cơ bản",
    tags: ["js", "basic"],
    comments: [
      { user: "An", text: "Hay quá!" },
      { user: "Bình", text: "Rất dễ hiểu" },
    ],
  },
  {
    id: 2,
    title: "Học React không khó",
    tags: ["react", "js"],
    comments: [{ user: "Chi", text: "Cảm ơn chia sẻ" }],
  },
];
//output
// - In ra tất cả title kèm số lượng comments của từng bài viết.
for (let index in posts) {
  titleContent = posts[index].title;
  quantity = posts[index].comments.length;
  console.log(`${titleContent} có ${quantity} comments`);
}

// - Tạo mảng mới chứa tất cả tags (không trùng lặp).
let newTags = [];
for (let index in posts) {
  item = posts[index].tags;
  for (let i in item) {
    if (!newTags.includes(item[i])) {
      newTags.push(item[i]);
    }
  }
}
console.log(newTags);

// - Tìm tất cả các bình luận của user "An".
const result = [];
for (let index in posts) {
  comment = posts[index].comments;
  comment.filter((item) => {
    const condition = "An";
    if (item.user.toLowerCase() === condition.toLowerCase()) {
      return result.push(item);
    }
  });
}
console.log(result);
