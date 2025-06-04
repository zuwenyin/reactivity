import trigger from "../../effect/trigger.js";
import { TriggerOpTypes } from "../../utils.js";

export default function (target, key) {
  if (target.hasOwnProperty(key)) {
    trigger(target, TriggerOpTypes.DELETE, key);
  }
  const res = Reflect.deleteProperty(target, key);

  return res;
}