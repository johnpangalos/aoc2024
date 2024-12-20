type Point = {
  coord: string;
  value: string;
};

type Direction =
  | "up"
  | "down"
  | "left"
  | "right"
  | "upLeft"
  | "upRight"
  | "downLeft"
  | "downRight";

function genGrid(input: string): Map<string, Point> {
  const lines = input.trim().split("\n");
  let y = 0;
  const grid = new Map<string, Point>();
  for (const line of lines) {
    const chars = line.split("");
    let x = 0;
    for (const char of chars) {
      grid.set(`${x},${y}`, { value: char, coord: `${x},${y}` });
      x++;
    }
    y++;
  }
  return grid;
}

function getNeighbors(
  grid: Map<string, Point>,
  point: Point,
): Map<Direction, Point> {
  const [x, y] = point.coord.split(",").map(Number);

  const map = new Map<Direction, Point>();

  const up = grid.get(`${x},${y - 1}`);
  if (up && up.value === point.value) map.set("up", up);
  const right = grid.get(`${x + 1},${y}`);
  if (right && right.value === point.value) map.set("right", right);
  const down = grid.get(`${x},${y + 1}`);
  if (down && down.value === point.value) map.set("down", down);
  const left = grid.get(`${x - 1},${y}`);
  if (left && left.value === point.value) map.set("left", left);
  return map;
}

function getSurrounding(
  grid: Map<string, Point>,
  point: Point,
): Map<Direction, Point> {
  const [x, y] = point.coord.split(",").map(Number);

  const map = new Map<Direction, Point>();
  const oob = { value: "OOB", coord: `-1,-1` };

  const up = grid.get(`${x},${y - 1}`);
  map.set("up", up ?? oob);

  const right = grid.get(`${x + 1},${y}`);
  map.set("right", right ?? oob);

  const down = grid.get(`${x},${y + 1}`);
  map.set("down", down ?? oob);

  const left = grid.get(`${x - 1},${y}`);
  map.set("left", left ?? oob);

  const upLeft = grid.get(`${x - 1},${y - 1}`);
  map.set("upLeft", upLeft ?? oob);

  const upRight = grid.get(`${x + 1},${y - 1}`);
  map.set("upRight", upRight ?? oob);

  const downLeft = grid.get(`${x - 1},${y + 1}`);
  map.set("downLeft", downLeft ?? oob);

  const downRight = grid.get(`${x + 1},${y + 1}`);
  map.set("downRight", downRight ?? oob);

  return map;
}

function floodNext(grid: Map<string, Point>, curr: Set<Point>): Set<Point> {
  const set = new Set<Point>();
  for (const p of curr) {
    const neighbors = getNeighbors(grid, p);
    neighbors.forEach((p) => set.add(p));
  }
  return set;
}

function main(input: string): void {
  const grid = genGrid(input);

  const regions = new Set<Set<Point>>();
  const checked = new Set<string>();

  for (const [coord, point] of grid) {
    const accRegion = new Set<Point>();
    let currRegion = new Set<Point>();
    currRegion.add(point);
    accRegion.add(point);
    if (checked.has(coord)) continue;
    checked.add(coord);

    while (true) {
      const next = floodNext(grid, currRegion);
      if (next.difference(accRegion).size === 0) break;
      next.forEach((p) => {
        checked.add(p.coord);
        accRegion.add(p);
      });
      currRegion = next;
    }

    regions.add(accRegion);
  }

  let count = 0;
  for (const region of regions) {
    const corners = new Set<string>();
    let crossCount = 0;
    for (const pnt of region) {
      const [x, y] = pnt.coord.split(",").map(Number);
      const topLeftCorner = `${x * 2},${y * 2}`;
      const topRigthCorner = `${x * 2 + 2},${y * 2}`;
      const bottomLeftCorner = `${x * 2},${y * 2 + 2}`;
      const bottomRigthCorner = `${x * 2 + 2},${y * 2 + 2}`;

      const surrounding = getSurrounding(grid, pnt);
      const up = surrounding.get("up")?.value;
      const left = surrounding.get("left")?.value;
      const right = surrounding.get("right")?.value;
      const down = surrounding.get("down")?.value;
      const upLeft = surrounding.get("upLeft")?.value;
      const upRight = surrounding.get("upRight")?.value;
      const downLeft = surrounding.get("downLeft")?.value;
      const downRight = surrounding.get("downRight")?.value;
      const { value } = pnt;

      if (
        up !== value && upLeft !== value && left !== value ||
        up === value && upLeft !== value && left === value
      ) {
        corners.add(topLeftCorner);
      }
      if (
        up !== value && upRight !== value && right !== value ||
        up === value && upRight !== value && right === value
      ) {
        corners.add(topRigthCorner);
      }
      if (
        down !== value && downRight !== value && right !== value ||
        down === value && downRight !== value && right === value
      ) {
        corners.add(bottomRigthCorner);
      }
      if (
        down !== value && downLeft !== value && left !== value ||
        down === value && downLeft !== value && left === value
      ) {
        corners.add(bottomLeftCorner);
      }

      if (
        up !== value && upLeft === value && left !== value
      ) {
        corners.add(`${topLeftCorner},${crossCount}`);
        crossCount++;
      }
      if (
        up !== value && upRight === value && right !== value
      ) {
        corners.add(`${topRigthCorner},${crossCount}`);
        crossCount++;
      }
      if (
        down !== value && downRight === value && right !== value
      ) {
        corners.add(`${bottomRigthCorner},${crossCount}`);
        crossCount++;
      }
      if (
        down !== value && downLeft === value && left !== value
      ) {
        corners.add(`${bottomLeftCorner},${crossCount}`);
        crossCount++;
      }
    }
    count += corners.size * region.size;
  }
  console.log(count);
}

const input = await Deno.readTextFile(`./day-12/input.txt`);
main(input);
