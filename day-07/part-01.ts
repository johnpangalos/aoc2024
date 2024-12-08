import * as fs from "fs/promises";

const input = await fs.readFile("./day-07/input.txt", "utf8");
const lines: [number, number[]][] = input
  .split("\n")
  .filter(Boolean)
  .map((line) => {
    const [result, values] = line.split(":");
    return [parseInt(result), values.split(" ").filter(Boolean).map(Number)];
  });

let count = 0;
for (const line of lines) {
  const [result, values] = line;
  const possible = values.reduce<number[]>((acc, value, idx) => {
    if (idx === 0) return [value];
    return [...acc.map((v) => v + value), ...acc.map((v) => v * value)];
  }, []);
  if (possible.includes(result)) count += result;
}
console.log(count);
