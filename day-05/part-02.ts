const input = await Deno.readTextFile("./day-05/input.txt");
const [pageOrdering, updates] = input.split("\n\n").map((x) => x.split("\n"));

const pageMap = new Map<number, { before: number[]; after: number[] }>();
pageOrdering.forEach((x) => {
  const [before, after] = x.split("|").map((x) => parseInt(x));
  const beforeEntry = pageMap.get(before) || { after: [], before: [] };
  beforeEntry.after.push(after);
  pageMap.set(before, beforeEntry);
  const afterEntry = pageMap.get(after) || { after: [], before: [] };
  afterEntry.before.push(before);
  pageMap.set(after, afterEntry);
});

let count = 0;
for (const update of updates.filter(Boolean)) {
  const nums = update
    .split(",")
    .filter(Boolean)
    .map((x) => parseInt(x));

  let newOrder = update.split(",").map((num) => parseInt(num));

  while (true) {
    let afterCorrect = undefined;
    const val = newOrder.find((num, idx) => {
      const after = pageMap.get(newOrder[idx + 1]);
      afterCorrect = after?.before.includes(num) ?? true;
      return !afterCorrect;
    });
    if (!val) break;
    const idx = newOrder.indexOf(val);
    if (!afterCorrect) {
      newOrder = [
        ...newOrder.slice(0, idx),
        newOrder[idx + 1],
        newOrder[idx],
        ...newOrder.slice(
          idx + 2 < newOrder.length ? idx + 2 : newOrder.length,
        ),
      ];
    }
  }
  if (!nums.every((value, index) => value === newOrder[index])) {
    count += newOrder[Math.floor(newOrder.length / 2)];
  }
}
console.log(count);
