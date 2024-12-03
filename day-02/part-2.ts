import * as fs from "fs/promises";

const input = await fs.readFile("./input.txt", "utf8");

const lines = input
  .split("\n")
  .filter(Boolean)
  .map((i) => i.split(" ").map(Number))
  .map((arr) => [
    arr,
    ...arr.map((_, idx, a) => [...a.slice(0, idx), ...a.slice(idx + 1)]),
  ]);

const isMonotonic = (items: number[]) =>
  items.every((curr, idx, arr) => {
    if (idx === 0) return true;
    return Math.sign(curr - arr[idx - 1]) === Math.sign(items[1] - items[0]);
  });

const passesDifference = (items: number[]) =>
  items.every((curr, idx, arr) => {
    if (idx === 0) return true;
    const diff = Math.abs(curr - arr[idx - 1]);
    return !(diff > 3 || diff === 0);
  });

const passes = (group: number[]) =>
  isMonotonic(group) && passesDifference(group);

const sum = lines.reduce((acc, curr) => {
  if (curr.some(passes)) acc += 1;
  return acc;
}, 0);

console.log(sum);
