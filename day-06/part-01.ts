type Point = { x: number; y: number; value: string };
type Direction = "up" | "down" | "left" | "right";

const map = new Map<`${string}-${string}`, Point>();

const guardChar = "^";

let direction: Direction = "up";

const turnMap: Record<Direction, Direction> = {
  up: "right",
  right: "down",
  down: "left",
  left: "up",
};

function nextPoint(point: Point, direction: Direction): Point | undefined {
  switch (direction) {
    case "up":
      return map.get(`${point.x}-${point.y - 1}`);
    case "down":
      return map.get(`${point.x}-${point.y + 1}`);
    case "left":
      return map.get(`${point.x - 1}-${point.y}`);
    case "right":
      return map.get(`${point.x + 1}-${point.y}`);
  }
}

const input = await Deno.readTextFile("./day-06/input.txt");
const lines = input.split("\n").filter(Boolean);
lines.forEach((line, y) => {
  line.split("").forEach((char, x) => {
    map.set(`${x}-${y}`, { x, y, value: char });
  });
});
const guardRes = [...map.entries()].find(([_, { value }]) =>
  value === guardChar
);
if (!guardRes) throw new Error("No guard found");
let [_, guard] = guardRes;

while (true) {
  const checkPoint = nextPoint(guard, direction);
  if (!checkPoint) {
    map.set(`${guard.x}-${guard.y}`, { x: guard.x, y: guard.y, value: "X" });
    break;
  }
  if (checkPoint.value === "#") direction = turnMap[direction];

  const next = nextPoint(guard, direction);
  if (!next) throw new Error("No next point");
  map.set(`${guard.x}-${guard.y}`, { x: guard.x, y: guard.y, value: "X" });
  guard = {
    x: next.x,
    y: next.y,
    value: guardChar,
  };
  map.set(`${next.x}-${next.y}`, guard);
}

let count = 0;
map.forEach(({ value }) => {
  if (value !== "X") return;
  count++;
});

console.log(count);
