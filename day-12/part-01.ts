type Point = {
  coord: string;
  value: string;
};

function genGrid(input: string): Map<string, Point> {
  const lines = input.trim().split("\n");
  let y = 0;
  const grid = new Map<string, Point>();
  for (const line of lines) {
    const chars = line.split("");
    let x = 0;
    for (const char of chars) {
      grid.set(`${x}-${y}`, { value: char, coord: `${x}-${y}` });
      x++;
    }
    y++;
  }
  return grid;
}

function getNeighbors(grid: Map<string, Point>, point: Point): Set<Point> {
  const [x, y] = point.coord.split("-").map(Number);

  const set = new Set<Point>();

  const up = grid.get(`${x}-${y - 1}`);
  if (up && up.value === point.value) set.add(up);
  const right = grid.get(`${x + 1}-${y}`);
  if (right && right.value === point.value) set.add(right);
  const down = grid.get(`${x}-${y + 1}`);
  if (down && down.value === point.value) set.add(down);
  const left = grid.get(`${x - 1}-${y}`);
  if (left && left.value === point.value) set.add(left);
  return set;
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
    let perimeter = 0;
    for (const p of region) {
      perimeter += 4 - getNeighbors(grid, p).size;
    }
    count += region.size * perimeter;
  }
  console.log(count);
}

const input = await Deno.readTextFile(`./day-12/input.txt`);
main(input);
