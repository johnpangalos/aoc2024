import * as fs from "fs/promises";
const input = await fs.readFile("./day-09/input.txt", "utf8");
const numbers = input.split("\n").filter(Boolean)[0].split("").map(Number);

let file = 0;
const map: Record<number, { length: number; file: number; idx: number }> = {};
let counter = 0;
const res = numbers.reduce<number[]>((acc, n, i) => {
  if (i % 2 === 0) {
    map[file] = {
      length: n,
      file: file,
      idx: counter,
    };
    for (let j = 0; j < n; j++) {
      counter++;
      acc.push(file);
    }
    file++;
    return acc;
  } else {
    for (let j = 0; j < n; j++) {
      counter++;
      acc.push(-1);
    }
    return acc;
  }
}, []);

Object.entries(map)
  .reverse()
  .forEach(([_, v]) => {
    const s = res.slice(0, v.idx);
    const replaceIdx = s.findIndex((_, jdx, arr) => {
      const slice = arr.slice(jdx, jdx + v.length);
      return slice.every((x) => x === -1) && slice.length === v.length;
    });
    if (replaceIdx === -1 || replaceIdx > v.idx) return;
    for (let i = replaceIdx; i < replaceIdx + v.length; i++) {
      res[i] = v.file;
    }
    for (let i = v.idx; i < v.idx + v.length; i++) {
      res[i] = -1;
    }
  });

const checksum = res.reduce((acc, n, idx) => {
  if (n === -1) return acc;
  return acc + n * idx;
}, 0);
console.log(checksum);
