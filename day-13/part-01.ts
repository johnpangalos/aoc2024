type Equations = {
  ax: number;
  bx: number;
  ay: number;
  by: number;
  xTot: number;
  yTot: number;
};

function fixRounding(num: number) {
  return Number(num.toPrecision(15));
}
function main(input: string) {
  const lines = input.split("\n");
  let idx = 1;
  const groups = new Set<Equations>();
  for (const _ in lines) {
    if (idx % 4 === 0) {
      const [ax, ay] = lines[idx - 4].split(":")[1].split(",").map((i) =>
        Number(i.split("+")[1])
      );
      const [bx, by] = lines[idx - 3].split(":")[1].split(",").map((i) =>
        Number(i.split("+")[1])
      );
      const [xTot, yTot] = lines[idx - 2].split(":")[1].split(",").map((i) =>
        Number(i.split("=")[1])
      );
      groups.add({ ax, ay, bx, by, xTot, yTot });
    }
    idx++;
  }
  let count = 0;
  for (const group of groups) {
    const b = fixRounding(
      (group.yTot / group.ay - group.xTot / group.ax) /
        (group.by / group.ay - group.bx / group.ax),
    );
    const a = fixRounding(
      (group.xTot - group.bx * b) / group.ax,
    );
    if (a % 1 === 0 && b % 1 === 0) {
      count += a * 3 + b;
    }
  }
  console.log(count);
}

const input = await Deno.readTextFile(`./day-13/input.txt`);
main(input);
