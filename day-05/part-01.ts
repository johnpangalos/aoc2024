import * as fs from "fs/promises";

const input = await fs.readFile("./day-05/input.txt", "utf8");
const [pageOrdering, updates] = input.split("\n\n").map((x) => x.split("\n"));

const pageMap = new Map<number, { before: number[]; after: number[] }>();
pageOrdering.forEach((x) => {
  const [beforeRaw, afterRaw] = x.split("|");
  const before = parseInt(beforeRaw);
  const after = parseInt(afterRaw);
  const beforeEntry = pageMap.get(before) || { after: [], before: [] };
  beforeEntry.after.push(after);
  pageMap.set(before, beforeEntry);
  const afterEntry = pageMap.get(after) || { after: [], before: [] };
  afterEntry.before.push(before);
  pageMap.set(after, afterEntry);
});

var count = 0;
for (const update of updates.filter(Boolean)) {
  let isCorrect = true;
  const nums = update
    .split(",")
    .filter(Boolean)
    .map((x) => parseInt(x));

  nums.forEach((num, idx) => {
    const entry = pageMap.get(num);
    if (!entry) return;
    if (idx === 0) return;
    if (entry.before.includes(nums[idx - 1])) return;
    isCorrect = false;
  });
  if (isCorrect) {
    count += nums[Math.floor(nums.length / 2)];
  }
}
console.log(count);
