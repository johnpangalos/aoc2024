import * as fs from "fs/promises";

type Point = { x: number; y: number; val: number };

type GridMap = Map<string, Point>;

function getNextNeighbors(point: Point, map: GridMap): Point[] {
  const { x, y, val } = point;
  const set: Point[] = [];
  [
    map.get(`${x}-${y - 1}`),
    map.get(`${x + 1}-${y}`),
    map.get(`${x}-${y + 1}`),
    map.get(`${x - 1}-${y}`),
  ].forEach((val) => {
    if (val === undefined) return;
    if (val.val !== point.val + 1) return;
    set.push(val);
  });
  return set;
}

export function main(input: string): number {
  const lines = input.split("\n").filter(Boolean);
  const map: GridMap = new Map();

  const zeroes = new Set<string>();
  lines.forEach((line, y) => {
    line.split("").forEach((char, x) => {
      if (char === "0") zeroes.add(`${x}-${y}`);
      if (char === ".") {
        map.set(`${x}-${y}`, { x, y, val: -1 });
      } else {
        map.set(`${x}-${y}`, { x, y, val: parseInt(char) });
      }
    });
  });

  let score = 0;
  for (const coord of zeroes) {
    const point = map.get(coord);
    if (!point) continue;
    let neighbors: Point[] = [];
    neighbors.push(point);
    let idx = 0;
    while (idx < 9) {
      let nineCount = 0;
      for (const n of neighbors) {
        if (n.val === 9) nineCount++;
      }
      if (nineCount === neighbors.length) break;

      const next: Point[] = [];
      for (const n of neighbors) {
        const nextNeighbors = getNextNeighbors(n, map);
        for (const nn of nextNeighbors) {
          next.push(nn);
        }
      }
      neighbors = next;
    }
    score += neighbors.length;
  }
  return score;
}

const input = await fs.readFile(`./day-10/input.txt`, "utf8");
console.log(main(input));
