import * as fs from "fs/promises";

const input = await fs.readFile("./input.txt", "utf8");

const lines = input
  .split("\n")
  .filter((i) => i)
  .map((i) => i.split(" ").map((i) => parseInt(i)));

const isAscending = (items: number[]) =>
  items.reduce((acc, curr, idx, arr) => {
    if (idx === 0) return acc;
    if (curr < arr[idx - 1]) return false;
    return acc;
  }, true);

const isDescending = (items: number[]) =>
  items.reduce((acc, curr, idx, arr) => {
    if (idx === 0) return acc;
    if (curr > arr[idx - 1]) return false;
    return acc;
  }, true);

const passesDifference = (items: number[]) =>
  items.reduce((acc, curr, idx, arr) => {
    if (idx === 0) return acc;
    const diff = Math.abs(curr - arr[idx - 1]);
    if (diff > 3 || diff === 0) return false;
    return acc;
  }, true);

const sum = lines.reduce((acc, curr) => {
  if ((isAscending(curr) || isDescending(curr)) && passesDifference(curr))
    acc += 1;
  return acc;
}, 0);

console.log(sum);
