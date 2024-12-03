import * as fs from "fs/promises";

let input = await fs.readFile("./day-03/input.txt", "utf8");

const regexes = { mul: /mul\((\d+),(\d+)\)/, do: /do\(\)/, dont: /don\'t\(\)/ };

let doing = true;
let count = 0;

while (true) {
  const nextVals: Record<
    string,
    { index?: number; val: string; match: string }
  > = Object.entries(regexes).reduce((acc, [k, r]) => {
    const m = input.match(r);
    return {
      ...acc,
      [k]: {
        index: m?.index,
        match: m?.[0],
        val: k === "mul" ? [m?.[1], m?.[2]] : undefined,
      },
    };
  }, {});

  if (Object.values(nextVals).every((v) => v === null)) break;
  const nextIdx = Math.min(
    ...Object.values(nextVals)
      .filter((v) => v.index !== undefined)
      .map((v) => v.index!),
  );
  const res = Object.entries(nextVals).find(([_, v]) => v.index === nextIdx);
  if (!res) break;

  const [key, { index, val, match }] = res;
  if (!index) break;
  input = input.slice(index + match.length - 1);

  switch (key) {
    case "mul":
      if (doing) count += parseInt(val[0], 10) * parseInt(val[1], 10);
      break;
    case "do":
      doing = true;
      break;
    case "dont":
      doing = false;
      break;
  }
}
console.log(count);
