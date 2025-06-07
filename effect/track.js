let isTrack = true;

// 暂停收集依赖
export function pauseTracking () {
  isTrack = false;
}

// 恢复收集依赖
export function resumeTracking () {
  isTrack = true;
}

export default function (target, type, key) {
  if (!isTrack) {
    return;
  }

  // console.log("收集器：原始对象为",target);
  console.log(`收集器：代理对象的【${key}】属性的【${type}】操作被拦截`);

}