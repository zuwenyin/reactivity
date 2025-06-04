import trigger from "../../effect/trigger.js"
import { isChanged, TriggerOpTypes } from "../../utils.js";

export default function (target, key, newVal) {
  const oldVal = target[key];
  const type = target.hasOwnProperty(key) ? TriggerOpTypes.SET : TriggerOpTypes.ADD;
  const res = Reflect.set(target, key, newVal);
  if (res && isChanged(oldVal, newVal)) {
    // 修改成功且值改变触发trigger
    trigger(target, type, key);
  }
  return res;
}