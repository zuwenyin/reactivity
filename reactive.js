import handle from "./handles/index.js"
import { isObject } from "./utils.js"

const proxyMap = new WeakMap();
export default function (target) {
  if (!isObject(target)) {
    return target;
  }

  if (proxyMap.has(target)) {
    return proxyMap.get(target);
  }
  const proxy = new Proxy(target, handle)
  proxyMap.set(target, proxy);
  return proxy;
}