import track, { pauseTracking, resumeTracking } from "../../effect/track.js"
import reactive from "../../reactive.js";
import { isObject, RAW, TrackOpTypes } from "../../utils.js";
// 拦截重写一些操作
const arrayInstrumentations = {};
["indexOf", "lastIndexOf", "includes"].forEach((key) => {
  arrayInstrumentations[key] = function (...args) {
    let res = Array.prototype[key].apply(this, args);
    // 代理对象中没有找到，则在原始对象中再找一遍
    if (res === -1 || res === false) {
      res = Array.prototype[key].apply(this[RAW], args);
    }
    return res
  }
});

["push", "pop", "unShift", "shift", "splice"].forEach((key) => {
  arrayInstrumentations[key] = function (...args) {
    pauseTracking();
    let res = Array.prototype[key].apply(this, args);
    resumeTracking();
  }
})

export default function (target, key) {

  // 如果是RAW返回原始对象
  if (key === RAW) {
    return target;
  }

  track(target, TrackOpTypes.GET, key);

  // 拦截并返回数组重写的查找方法
  if (Array.isArray(target) && arrayInstrumentations.hasOwnProperty(key)) {
    return arrayInstrumentations[key]
  }

  const res = Reflect.get(target, key);

  if (isObject(res)) {
    return reactive(res);
  }
  return res;
}