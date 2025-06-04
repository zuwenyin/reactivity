/**
 * 判断是否为对象
 * @param {*} val 待判定变量
 * @returns 
 */
export const isObject = (val) => typeof val === "object" && val !== null;

/**
 * 判断变量是否改变
 * @param {*} oldVal 旧值 
 * @param {*} newVal 新值
 * @returns 
 */
export const isChanged = (oldVal,newVal)=> !Object.is(oldVal,newVal);

/**
 * track收集类型
 */
export const TrackOpTypes = {
  GET: 'get',
  HAS: 'has',
  ITERATE: 'iterate'
}

/**
 * trigger触发类型
 */
export const TriggerOpTypes = {
  SET: 'set',
  ADD: 'add',
  DELETE: 'delete'
}