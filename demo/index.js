$("#h2").html(new Date());

function sortData(data) {
  return data.sort((a, b) => {
    // 先按 matCode 排序
    if (a.matCode < b.matCode) return -1;
    if (a.matCode > b.matCode) return 1;
    // 如果 matCode 相同，再按 werks 排序
    if (a.werks < b.werks) return -1;
    if (a.werks > b.werks) return 1;
    return 0;
  });
}

// 示例数据
const data = [
  {
    id: null,
    matnr: "000000000010000008",
    werks: "A101",
    werksName: "达茂一期",
    matCode: "10000008"
  },
  {
    id: null,
    matnr: "000000000010000008",
    werks: "D024",
    werksName: "十三间房四期",
    matCode: "10000008"
  },
  {
    id: null,
    matnr: "000000000010000008",
    werks: "B099",
    werksName: "右玉二期",
    matCode: "10000008"
  },
  {
    id: null,
    matnr: "000000000010000008",
    werks: "D101",
    werksName: "达茂四期",
    matCode: "10000008"
  },
  {
    id: null,
    matnr: "000000000010000008",
    werks: "A066",
    werksName: "达茂五期",
    matCode: "10000008"
  },
  {
    id: null,
    matnr: "000000000010000008",
    werks: "A017",
    werksName: "平陆一期",
    matCode: "10000008"
  },
  {
    id: null,
    matnr: "000000000010000008",
    werks: "B013",
    werksName: "石首桃花山二期",
    matCode: "10000008"
  },
  {
    id: null,
    matnr: "000000000010000008",
    werks: "B013",
    werksName: "石首桃花山二期",
    matCode: "10000007"
  },
  {
    id: null,
    matnr: "000000000010000008",
    werks: "A012",
    werksName: "石首桃花山二期",
    matCode: "10000007"
  },
  {
    id: null,
    matnr: "000000000010000008",
    werks: "C010",
    werksName: "石首桃花山二期",
    matCode: "10000007"
  }
];

// 调用函数
const sortedData = sortData(data);

console.log(sortedData);
