type Point = { x: number; y: number; value: string };
type Direction = "up" | "down" | "left" | "right";
type Step = { x: number; y: number; value: string; direction: Direction };

const map = new Map<`${string}-${string}`, Point>();

const guardChar = "^";
const obstacleChar = "#";

let direction: Direction = "up";
const input = await Deno.readTextFile("./day-06/input.txt");

const lines = input.split("\n").filter(Boolean);
lines.forEach((line, y) => {
  line.split("").forEach((char, x) => {
    map.set(`${x}-${y}`, { x, y, value: char });
  });
});

const originalMap = new Map(map);

const turnMap: Record<Direction, Direction> = {
  up: "right",
  right: "down",
  down: "left",
  left: "up",
};

function nextPoint(
  point: Point,
  direction: Direction,
  map: Map<string, Point>,
): Point | undefined {
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

const guardRes = [...map.entries()].find(([_, { value }]) =>
  value === guardChar
);
if (!guardRes) throw new Error("No guard found");
let [_, guard] = guardRes;
const originalGuard = { ...guard };

const points: Set<string> = new Set();

while (true) {
  const checkPoint = nextPoint(guard, direction, map);
  if (!checkPoint) {
    map.set(`${guard.x}-${guard.y}`, { x: guard.x, y: guard.y, value: "X" });
    break;
  }
  if (checkPoint.value === "#") {
    direction = turnMap[direction];
    continue;
  }

  map.set(`${guard.x}-${guard.y}`, { x: guard.x, y: guard.y, value: "X" });
  guard = {
    x: checkPoint.x,
    y: checkPoint.y,
    value: guardChar,
  };
  map.set(`${checkPoint.x}-${checkPoint.y}`, guard);
}

map.forEach((point) => {
  if (point.value !== "X") return;

  if (point.x === originalGuard.x && point.y === originalGuard.y) return;
  let guard = { ...originalGuard };
  let direction: Direction = "up";
  const runMap = new Map([...originalMap]);
  runMap.set(`${point.x}-${point.y}`, { x: point.x, y: point.y, value: "#" });
  const steps: Set<string> = new Set();

  while (true) {
    const next = nextPoint(guard, direction, runMap);
    if (!next) break;

    if (next.value === obstacleChar) {
      direction = turnMap[direction];
      continue;
    }

    guard = {
      x: next.x,
      y: next.y,
      value: guardChar,
    };

    const step = `${guard.x}-${guard.y}-${direction}`;

    if (steps.has(step)) {
      points.add(`${point.x}-${point.y}`);
      break;
    }
    steps.add(step);
  }
});

console.log(points.size);
