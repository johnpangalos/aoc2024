const input = await Deno.readTextFile(`./day-11/input.txt`);
let map = new Map<number, number>();
for (const val of input.trim().split(" ").map(Number)) {
  const curr = map.get(val);
  if (!curr) map.set(val, 1);
  else map.set(val, curr + 1);
}

function next(m: Map<number, number>) {
  const nextMap = new Map<number, number>();

  for (const [key, val] of m) {
    if (key === 0) {
      const currOne = nextMap.get(1);
      if (currOne) {
        nextMap.set(1, currOne + val);
      } else {
        nextMap.set(1, val);
      }
      continue;
    }

    const strKey = key.toString();
    if (strKey.length % 2 === 0) {
      const half = parseInt(strKey.slice(0, strKey.length / 2));
      const currHalf = nextMap.get(half);
      if (currHalf) {
        nextMap.set(half, currHalf + val);
      } else {
        nextMap.set(half, val);
      }

      const otherHalf = parseInt(strKey.slice(strKey.length / 2));
      const currOtherHalf = nextMap.get(otherHalf);

      if (currOtherHalf) {
        nextMap.set(otherHalf, currOtherHalf + val);
      } else {
        nextMap.set(otherHalf, val);
      }
      continue;
    }

    const yearMult = key * 2024;

    const currYearMutl = nextMap.get(yearMult);
    if (currYearMutl) {
      nextMap.set(yearMult, currYearMutl + val);
    } else {
      nextMap.set(yearMult, val);
    }
  }
  return nextMap;
}
let i = 0;
while (i < 75) {
  map = next(map);
  i++;
}

let count = 0;
map.forEach((val) => {
  count += val;
});
console.log(count);
