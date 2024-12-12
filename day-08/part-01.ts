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

const anitnodes = new Set<string>();
charMap.forEach((points) => {
  points.forEach((point, idx, arr) => {
    arr.forEach((compare, compareIdx) => {
      if (compareIdx === idx) return;
      const diff = difference(point, compare);
      const antinode: Point = {
        x: point.x - diff.x,
        y: point.y - diff.y,
        char: "#",
      };
      const curr = map.get(`${antinode.x}-${antinode.y}`);
      if (!curr) return;
      anitnodes.add(`${antinode.x}-${antinode.y}`);
      if (curr?.char !== ".") return;
      map.set(`${antinode.x}-${antinode.y}`, antinode);
    });
  });
});

console.log(anitnodes.size);
