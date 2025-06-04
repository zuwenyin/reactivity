import track from "../../effect/track.js"
import reactive from "../../reactive.js";
import { isObject, TrackOpTypes } from "../../utils.js"

export default function (target, key) {
  track(target, TrackOpTypes.GET, key);

  const res = Reflect.get(target, key);

  if (isObject(res)) {
    return reactive(res);
  }
  return res;
}