import reactive from "./reactive.js"

const o = {
  a: 1,
  b: 2,
  c: { d: 2 }
}
const po = reactive(o)
// po.b = 2;
// 'a' in po
for (const key in po) {
  console.log(key);
  
}
console.log("init reactivity");