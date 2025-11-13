//input:
const watchHistory = [
  { userId: 1, videoId: "A1", duration: 10 },
  { userId: 2, videoId: "B1", duration: 15 },
  { userId: 1, videoId: "A1", duration: 20 },
  { userId: 3, videoId: "C1", duration: 30 },
  { userId: 2, videoId: "B1", duration: 5 },
  { userId: 1, videoId: "A2", duration: 25 },
  { userId: 3, videoId: "C1", duration: 15 },
];

//output:
// Tính tổng thời gian xem của từng video.
const videoIds = (watchHistory) => {
  let newArr = [];
  watchHistory.forEach((item) => {
    let newObj = {};
    newObj.videoId = item.videoId;
    newObj.duration = item.duration;
    newArr.push(newObj);
  });
  return newArr;
};
const totalDurationVideoId = (watchHistory) => {
  let videoIdArr = videoIds(watchHistory);
  let result = videoIdArr.reduce((acc, cur) => {
    if (!acc.find((item) => item.videoId === cur.videoId)) {
      acc.push(cur);
    } else if (
      acc.find((item) => {
        if (item.videoId === cur.videoId) {
          item.duration += cur.duration;
        }
      })
    );
    return acc;
  }, []);
  return result;
};
console.log(totalDurationVideoId(watchHistory));

//Tìm video được xem nhiều nhất (dựa trên tổng thời gian).
const mostViewedTime = (watchHistory) => {
  let videoIdArr = totalDurationVideoId(watchHistory);
  let result = videoIdArr.reduce((acc, cur) =>
    acc.duration > cur.duration ? acc : cur
  );
  return result.videoId;
};
console.log(mostViewedTime(watchHistory));

//Nhóm lịch sử xem theo userId, trong đó mỗi userId sẽ chứa danh sách các video mà họ đã xem và tổng thời gian xem mỗi video.
const mergeVideoIDs = (watchHistory) => {
  let result = [];
  let userId = [];
  watchHistory.reduce((acc, cur) => {
    if (!acc.find((item) => item.userId === cur.userId)) {
      acc.push(cur);
      userId.push(cur.userId);
    }
    return acc;
  }, []);
  userId.forEach((id) => {
    let newArr = watchHistory.filter((item) => item.userId === id);
    newArr.reduce((acc, cur) => {
      const condition = acc.find((item) => item.videoId === cur.videoId);
      if (condition) {
        condition.duration += cur.duration;
        result.push(acc);
      } else {
        acc.push({
          userId: id,
          videoId: cur.videoId,
          duration: cur.duration,
        });
      }
      return acc;
    }, []);
  });
  return result;
};
console.log(mergeVideoIDs(watchHistory));
