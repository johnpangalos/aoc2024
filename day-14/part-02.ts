type Robot = {
  x: number;
  y: number;
  vX: number;
  vY: number;
};

function applyVelocity(
  robot: Robot,
  seconds: number,
  maxX: number,
  maxY: number,
): Robot {
  const r = { ...robot };

  const nextX = (r.x + r.vX * seconds) % (maxX + 1);
  if (nextX === maxX + 1) r.x = 0;
  else if (nextX >= 0) r.x = nextX;
  else r.x = maxX + 1 + nextX;

  const nextY = (r.y + r.vY * seconds) % (maxY + 1);
  if (nextY === maxY + 1) r.y = 0;
  else if (nextY >= 0) r.y = nextY;
  else r.y = maxY + 1 + nextY;
  return r;
}

function hasTree(snap: Record<string, Robot>, maxX: number, maxY: number) {
  let x = 0;
  let y = 0;
  let str = "";
  while (y <= maxY) {
    while (x <= maxX) {
      if (snap[`${x},${y}`] !== undefined) str += "X";
      else str += ".";
      x++;
    }
    str += "\n";
    x = 0;
    y++;
  }
  console.clear();
  console.log(str);
  return str.includes("XXXXXXXXXXXXXXXX");
}

function main(input: string) {
  const lines = input.split("\n").filter((i) => i);
  const robots: Robot[] = [];
  let maxX = 0;
  let maxY = 0;
  for (const line of lines) {
    const [x, y, vX, vY] = line.split(" ").flatMap((i) => {
      return i.split("=")[1].split(",").map((s) => Number(s));
    });
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
    robots.push({ x, y, vX, vY });
  }

  let idx = 0;
  while (true) {
    const snap: Record<string, Robot> = {};
    for (const robot of robots) {
      const next = applyVelocity(robot, idx, maxX, maxY);
      snap[`${next.x},${next.y}`] = next;
    }

    if (hasTree(snap, maxX, maxY)) break;
    idx++;
  }
  console.log(idx);
}
const input = await Deno.readTextFile(`./day-14/input.txt`);
main(input);
