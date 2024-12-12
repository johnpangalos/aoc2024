const input = await Deno.readTextFile("./day-03/input.txt");
console.log(
  input
    .matchAll(/mul\((\d+),(\d+\))/g)
    .reduce((acc, x) => acc + parseInt(x[1]) * parseInt(x[2]), 0),
);
