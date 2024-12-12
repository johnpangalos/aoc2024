const input = await Deno.readTextFile("./day-09/input.txt");
const numbers = input.split("\n").filter(Boolean)[0].split("").map(Number);

let fileCounter = 0;
const res = numbers.reduce<number[]>((acc, n, i) => {
  if (i % 2 === 0) {
    for (let j = 0; j < n; j++) {
      acc.push(fileCounter);
    }
    fileCounter++;
    return acc;
  } else {
    for (let j = 0; j < n; j++) {
      acc.push(-1);
    }
    return acc;
  }
}, []);

while (true) {
  const idx = res.findIndex((v) => v === -1);
  if (idx === -1) break;
  const end = res.pop();
  if (end === undefined) throw new Error("No end");
  res[idx] = end;
}

const checksum = res.reduce((acc, n, idx) => acc + n * idx, 0);
console.log(checksum);
