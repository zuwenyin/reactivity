import trigger from "../../effect/trigger.js"
import { isChanged, TrackOpTypes, TriggerOpTypes } from "../../utils.js";

export default function (target, key, newVal) {
  const oldVal = target[key];
  const oldLen = target.length;

  const type = target.hasOwnProperty(key) ? TriggerOpTypes.SET : TriggerOpTypes.ADD;
  const res = Reflect.set(target, key, newVal);
  if (res && isChanged(oldVal, newVal)) {
    // 修改成功且值改变触发trigger
    trigger(target, type, key);

    const newLen = target.length;
    if (Array.isArray(target) && newLen !== oldLen) {
      if (key !== "length") {
        // 隐式的改变长度
        trigger(target, TrackOpTypes.GET, 'length66');
      } else {
        // 隐式删除
        if (newLen < oldLen) {
          for (let i = newLen; i < oldLen; i++) {
            trigger(target, TriggerOpTypes.DELETE, i.toString());
          }
        }
      }
    }
  }
  return res;
}