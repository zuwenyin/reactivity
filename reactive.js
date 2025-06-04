import handle from "./handles/index.js"

export default function (target) {
  return new Proxy(target, handle)
}