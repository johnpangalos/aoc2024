const input = await Deno.readTextFile(`./day-11/input.txt`);
const lines = input.trim().split(" ").map(Number);
const temp = {
  arr: lines,
  print: function () {
    console.log(this.arr);
  },
  next: function () {
    const nextArr = [];

    for (const val of this.arr) {
      if (val === 0) {
        nextArr.push(1);
        continue;
      }

      const strVal = val.toString();
      if (strVal.length % 2 === 0) {
        nextArr.push(parseInt(strVal.slice(0, strVal.length / 2)));
        nextArr.push(parseInt(strVal.slice(strVal.length / 2)));
        continue;
      }

      nextArr.push(val * 2024);
    }
    this.arr = nextArr;
  },
};
let i = 0;
while (i < 25) {
  temp.next();
  i++;
}

console.log(temp.arr.length);
