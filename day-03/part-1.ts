import * as fs from "fs/promises";

const input = await fs.readFile("./day-03/test.txt", "utf8");
const temp = [...input.matchAll(/mul\(\d+,\d+\)/)];
console.log(temp);
