const input = await Deno.readTextFile("./day-08/input.txt");
const lines = input.split("\n").filter(Boolean);

type Point = { x: number; y: number; char: string };
const map = new Map<`${string}-${string}`, Point>();

lines.forEach((line, y) => {
  line.split("").forEach((char, x) => {
    map.set(`${x}-${y}`, { x, y, char });
  });
});

function difference(a: Point, b: Point): { x: number; y: number } {
  return { x: b.x - a.x, y: b.y - a.y };
}

const charMap = new Map<string, Point[]>();
for (const point of map.values()) {
  if (point.char === ".") continue;

  const char = charMap.get(point.char);
  if (!char) {
    charMap.set(point.char, [point]);
  } else {
    char.push(point);
    charMap.set(point.char, char);
  }
}

charMap.forEach((points) => {
  points.forEach((point, idx, arr) => {
    arr.forEach((compare, compareIdx) => {
      if (compareIdx === idx) return;
      const diff = difference(point, compare);
      let runs = 1;
      while (true) {
        const antinode: Point = {
          x: point.x - diff.x * runs,
          y: point.y - diff.y * runs,
          char: "#",
        };
        runs++;
        const curr = map.get(`${antinode.x}-${antinode.y}`);
        if (!curr) break;
        if (curr?.char !== ".") continue;
        map.set(`${antinode.x}-${antinode.y}`, antinode);
      }
    });
  });
});

let count = 0;
map.forEach((v) => {
  if (v.char === ".") return;
  count++;
});
console.log(count);
