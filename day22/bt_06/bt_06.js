//input:
const matches = [
  { teamA: "A", teamB: "B", scoreA: 2, scoreB: 1 },
  { teamA: "C", teamB: "D", scoreA: 1, scoreB: 3 },
  { teamA: "A", teamB: "C", scoreA: 2, scoreB: 2 },
  { teamA: "B", teamB: "D", scoreA: 0, scoreB: 1 },
  { teamA: "A", teamB: "D", scoreA: 3, scoreB: 1 },
];

//output:
// Tính số trận thắng, hòa, thua của mỗi đội.
const resultMatches = (matches) => {
  return matches.reduce((acc, cur) => {
    if (!acc[cur.teamA]) {
      acc[cur.teamA] = { win: 0, draw: 0, lose: 0 };
    }
    if (!acc[cur.teamB]) {
      acc[cur.teamB] = { win: 0, draw: 0, lose: 0 };
    }
    if (cur.scoreA > cur.scoreB) {
      acc[cur.teamA].win = acc[cur.teamA].win + 1;
      acc[cur.teamB].lose = acc[cur.teamB].lose + 1;
    } else if (cur.scoreA < cur.scoreB) {
      acc[cur.teamA].lose = acc[cur.teamA].lose + 1;
      acc[cur.teamB].win = acc[cur.teamB].win + 1;
    } else if (cur.scoreA === cur.scoreB) {
      acc[cur.teamA].draw = acc[cur.teamA].draw + 1;
      acc[cur.teamB].draw = acc[cur.teamB].draw + 1;
    }
    return acc;
  }, {});
};
console.log(resultMatches(matches));

/*
Xếp hạng các đội bóng theo số điểm, với quy tắc:
  + Thắng: +3 điểm
  + Hòa: +1 điểm
  + Thua: +0 điểm
*/
const rankTeams = (matches) => {
  const resultTeams = Object.entries(resultMatches(matches));
  let newArr = [];
  resultTeams.forEach((team) => {
    let winScore = 3;
    let drawScore = 1;
    let loseScore = 0;
    let totalScore =
      team[team.length - 1].win * winScore +
      team[team.length - 1].draw * drawScore +
      team[team.length - 1].lose * loseScore;
    team.totalScore = totalScore;
    newArr.push(team);
  });
  const result = newArr.sort((a, b) => {
    return b.totalScore - a.totalScore;
  });
  return result;
};
console.log(rankTeams(matches));

//Tìm đội có số bàn thắng nhiều nhất.
const bestTeams = (matches) => {
  const totalGoal = matches.reduce((acc, cur) => {
    if (!acc[cur.teamA]) {
      acc[cur.teamA] = { totalGoal: 0 };
    }
    if (!acc[cur.teamB]) {
      acc[cur.teamB] = { totalGoal: 0 };
    }
    if (cur.scoreA > cur.scoreB) {
      acc[cur.teamA].totalGoal += cur.scoreA;
      acc[cur.teamB].totalGoal += cur.scoreB;
    } else if (cur.scoreA < cur.scoreB) {
      acc[cur.teamA].totalGoal += cur.scoreA;
      acc[cur.teamB].totalGoal += cur.scoreB;
    } else if (cur.scoreA === cur.scoreB) {
      acc[cur.teamA].totalGoal += cur.scoreA;
      acc[cur.teamB].totalGoal += cur.scoreB;
    }

    return acc;
  }, []);
  const newArr = Object.entries(totalGoal);
  const result = newArr.reduce((acc, cur) => {
    return acc[acc.length - 1].totalGoal > cur[cur.length - 1].totalGoal
      ? acc
      : cur;
  });
  return result;
};
console.log(bestTeams(matches));
