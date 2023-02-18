const fs = require("fs");
const csv = require("csv-parser");

function goat_awards(fileName) {
  const csvResults = [];
  const sortFunctions = {
    mostPoints: undefined,
    mostAssists: undefined,
    mostRebounds: undefined,
    mostBlocks: undefined,
  };
  fs.createReadStream(fileName)
    .pipe(
      csv({
        mapValues: ({ header, _, value }) => {
          return header === "name" ? value : Number(value);
        },
      })
    )
    .on(`data`, (data) => csvResults.push(data))
    .on(`end`, () => {
      sortData = Data([...csvResults]);
      sortFunctions.mostPoints = sortData(`points`)[0];
      sortFunctions.mostAssists = sortData(`assists`)[0];
      sortFunctions.mostRebounds = sortData(`rebounds`)[0];
      sortFunctions.mostBlocks = sortData(`blocks`)[0];
      console.log(sortFunctions);
    });
}

function Data(arr) {
  return (criteria) =>
    arr.sort((a, b) => {
      return a[criteria] < b[criteria] ? 1 : a[criteria] > b[criteria] ? -1 : 0;
    });
}
console.log(goat_awards(`players_data.csv`));
