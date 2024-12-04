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

function getNeighbors(x: number, y: number, map: CharMap): Char[] {
  return [
    map[`${x},${y - 1}`],
    map[`${x + 1},${y - 1}`],
    map[`${x + 1},${y}`],
    map[`${x + 1},${y + 1}`],
    map[`${x},${y + 1}`],
    map[`${x - 1},${y + 1}`],
    map[`${x - 1},${y}`],
    map[`${x - 1},${y - 1}`],
  ].filter(Boolean);
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

const hits = Object.values(charMap).reduce((acc, char) => {
  if (char.val !== "X") return acc;
  const neighbors = getNeighbors(char.x, char.y, charMap);
  if (neighbors.length === 0) return acc;

  const m = neighbors.reduce<[char: Char, direction: Direction][]>((acc, n) => {
    if (n.val !== "M") return acc;
    const direction = {
      x: n.x - char.x,
      y: n.y - char.y,
    };
    return [...acc, [n, direction]];
  }, []);
  if (m.length === 0) return acc;
  const a = m.reduce<[char: Char, direction: Direction][]>((acc, [c, d]) => {
    const next = charMap[`${c.x + d.x},${c.y + d.y}`];
    if (!next || next.val !== "A") return acc;
    return [...acc, [next, d]];
  }, []);
  const s = a.reduce<[char: Char][]>((acc, [c, d]) => {
    const next = charMap[`${c.x + d.x},${c.y + d.y}`];
    if (!next || next.val !== "S") return acc;
    return [...acc, [next]];
  }, []);

  return acc + s.length;
}, 0);

console.log(hits);
