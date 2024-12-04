import * as fs from "fs/promises";

type Char = {
  x: number;
  y: number;
  val: string;
};
type Direction = {
  x: number;
  y: number;
};
type X = number;
type Y = number;
type CharMap = Record<`${X},${Y}`, Char>;

const input = await fs.readFile("./day-04/input.txt", "utf8");
const lines = input.split("\n").filter(Boolean);

function getCorners(x: number, y: number, map: CharMap): string {
  return [
    map[`${x + 1},${y - 1}`],
    map[`${x + 1},${y + 1}`],
    map[`${x - 1},${y + 1}`],
    map[`${x - 1},${y - 1}`],
  ]
    .filter(Boolean)
    .reduce((acc, c) => `${acc}${c.val}`, "");
}

const charMap: CharMap = {};

lines.forEach((line, y) => {
  const chars = line.split("");
  chars.forEach((val, x) => {
    charMap[`${x},${y}`] = {
      x,
      y,
      val,
    };
  });
});
const allowedCorners = ["SSMM", "MSSM", "MMSS", "SMMS"];

const hits = Object.values(charMap).reduce((acc, char) => {
  if (char.val !== "A") return acc;
  if (!allowedCorners.includes(getCorners(char.x, char.y, charMap))) return acc;
  return acc + 1;
}, 0);

console.log(hits);
