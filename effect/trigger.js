export default function (target, type, key) {
  console.log('触发器：原始对象为',target);
  console.log(`触发器：代理对象的【${key}】属性的【${type}】操作被拦截`);
}