import { match, P } from "jsr:@gabriel/ts-pattern";

type Keypad = Map<string, { x: number; y: number }>;
const keypad = new Map<string, { x: number; y: number }>();
keypad.set("A", { x: 2, y: 3 });
keypad.set("0", { x: 1, y: 3 });
keypad.set("1", { x: 0, y: 2 });
keypad.set("2", { x: 1, y: 2 });
keypad.set("3", { x: 2, y: 2 });
keypad.set("4", { x: 0, y: 1 });
keypad.set("5", { x: 1, y: 1 });
keypad.set("6", { x: 2, y: 1 });
keypad.set("7", { x: 0, y: 0 });
keypad.set("8", { x: 1, y: 0 });
keypad.set("9", { x: 2, y: 0 });

const directionalKeypad = new Map<string, { x: number; y: number }>();
directionalKeypad.set("left", { x: 0, y: 1 });
directionalKeypad.set("up", { x: 1, y: 0 });
directionalKeypad.set("down", { x: 1, y: 1 });
directionalKeypad.set("right", { x: 2, y: 1 });
directionalKeypad.set("A", { x: 2, y: 0 });

function getPath(
  k: Keypad,
  fromKey: string,
  toKey: string,
): string[] {
  const from = k.get(fromKey);
  const to = k.get(toKey);
  if (from === undefined || to === undefined) throw new Error("invalid key");
  const dX = to.x - from.x;
  const dY = to.y - from.y;
  const path: string[] = [];

  match(dX)
    .with(P.when((x) => x < 0), () => {
      for (let i = 0; i < Math.abs(dX); i++) path.push("left");
    })
    .with(P.when((x) => x > 0), () => {
      for (let i = 0; i < Math.abs(dX); i++) path.push("right");
    });
  match(dY)
    .with(P.when((y) => y < 0), () => {
      for (let i = 0; i < Math.abs(dY); i++) path.push("up");
    })
    .with(P.when((y) => y > 0), () => {
      for (let i = 0; i < Math.abs(dY); i++) path.push("down");
    });
  return path;
}

function getFullPath(s: string, start: boolean = false): string[][] {
  let part = s;
  if (start) part = `A${part}`;
  const chars = part.split("");
  let idx = 0;
  let acc: string[][] = [];
  for (const c of chars) {
    if (idx === 0) {
      idx++;
      continue;
    }
    const next = getPath(keypad, chars[idx - 1], c);
    // acc = acc.reduce((acc, curr) => {
    for (let idx = 0; idx < next.length; idx++) {
    }
    // }, []);
    // acc.push("A");
    idx++;
  }
  return acc;
}

console.log(getFullPath("029A", true));
