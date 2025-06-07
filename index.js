import reactive from "./reactive.js"

const o = {
  a: 1,
  b: 2,
  c: { d: 2 }
};
// const po1 = reactive(o);
// const po2 = reactive(o);
// po.b = 2;
// 'a' in po
// for (const key in po1) {
// }
const arr = [111, o, 333];
const p = reactive(arr);
p.length = 2
// p[1] = 666
// p.splice()
console.log("init reactivity", p);