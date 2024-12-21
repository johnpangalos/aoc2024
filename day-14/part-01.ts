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

  const quadrants = [0, 0, 0, 0];
  for (const robot of robots) {
    const next = applyVelocity(robot, 100, maxX, maxY);
    if (next.x < (maxX / 2) && next.y < (maxY / 2)) quadrants[0]++;
    if (next.x > (maxX / 2) && next.y < (maxY / 2)) quadrants[1]++;

    if (next.x < (maxX / 2) && next.y > (maxY / 2)) quadrants[2]++;
    if (next.x > (maxX / 2) && next.y > (maxY / 2)) quadrants[3]++;
  }
  console.log(quadrants.reduce((acc, curr) => acc * curr, 1));
}
const input = await Deno.readTextFile(`./day-14/input.txt`);
main(input);
