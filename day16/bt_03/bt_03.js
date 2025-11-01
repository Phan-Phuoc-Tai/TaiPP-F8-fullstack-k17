/*
- input: số thứ tự trong bảng cửu chương từ 1 -> 10
- biến tableHTML = `<table>... `
- biến multiplication = "" , result, output = "", tdContent = "";
- biến row, col;
- biến maxRow = 4, maxCol = 10
- for row = 1, row <= maxRow , row++
  *if row lẻ :
    + numberMultiply = "${col}"
  *if row chẵn :
    output = result;
    + tdContent += {output}
- output: Table có 4 row, 5 col
  + row 1 : hiển thị số thứ tự từ 1 -> 5, căn giữa và chữ đậm
  + row 2 : hiển thị bảng cửu chương từ 1 -> 5
  + row 3 : hiển thị số thứ tự từ 6 -> 10, căn giữa và chữ đậm
  + row 4 : hiển thị bảng cửu chương từ 6 -> 10
*/

// let tableHTML = `<table
//       border="1"
//       width="100%"
//       height="80px"
//     >`;
// let multiplication = "";
// let result;
// let output = "";
// let tdContent = "";
// let maxRow = 4;
// let className = `text-center-bold`;
// for (let row = 1; row <= maxRow; row++) {
//   tableHTML += `<tr>`;
//   let maxCol = 10;
//   if (row % 2 !== 0) {
//     maxCol = row === 1 ? maxCol / 2 : maxCol;
//     for (let col = row === 1 ? 1 : 6; col <= maxCol; col++) {
//       multiplication = `${col}`;
//       tableHTML += `<td class = "${className}">${multiplication}</td>`;
//     }
//   } else {
//     maxCol = row === 2 ? maxCol / 2 : maxCol;
//     for (let col = row === 2 ? 1 : 6; col <= maxCol; col++) {
//       tdContent = "";
//       for (let i = 1; i <= 10; i++) {
//         result = col * i;
//         output = `${col} x ${i} = ${result}<br>`;
//         tdContent += `${output}`;
//       }
//       tableHTML += `<td>${tdContent}</td>`;
//     }
//   }

//   tableHTML += `</tr>`;
// }
// tableHTML += `</table>`;

// document.body.innerHTML = tableHTML;

function renderMultiplicationTable() {
  const className = "text-center-bold";
  let tableHTML = `<table border="1" width="100%" >`;
  // hiển thị 2 block: 1 ~ 5 và 6 ~ 10
  for (let block = 0; block < 2; block++) {
    tableHTML += "<tr>";
    const start = block === 0 ? 1 : 6;
    const end = block === 0 ? 5 : 10;
    for (let col = start; col <= end; col++) {
      tableHTML += `<td class = "${className}">${col}</td>`;
    }
    tableHTML += "</tr>";

    tableHTML += "<tr>";
    for (let col = start; col <= end; col++) {
      let td = "";
      for (let i = 1; i <= 10; i++) {
        td += `${col} x ${i} = ${col * i}<br>`;
      }
      tableHTML += `<td>${td}</td>`;
    }
    tableHTML += "</tr>";
  }
  tableHTML += "</table>";
  return tableHTML;
}
document.body.innerHTML = renderMultiplicationTable();
