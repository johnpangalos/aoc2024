import * as fs from "fs/promises";

const input = await fs.readFile("./day-03/test.txt", "utf8");
console.log(
  input
    .matchAll(/mul\((\d+),(\d+\))/g)
    .reduce((acc, x) => acc + parseInt(x[1]) * parseInt(x[2]), 0),
);
