// 依赖收集
let activeEffect = null;
let depsMap = new Map();
function track (target, key) {
  let deps = depsMap.get(key);
  if (!deps) {
    deps = new Set();
  }

  if (activeEffect) {
    deps.add(activeEffect);
    depsMap.set(key, deps);
    activeEffect.deps.push(deps);
  }
  console.log(depsMap);

}

// 派发更新
function trigger (target, key, value) {
  const currentSets = depsMap.get(key);

  if (currentSets && currentSets.size) {
    currentSets.forEach(fn => {
      console.log('state.a ', key, state.a, fn.deps);
      cleanUp(fn)
      fn();
    });
  }
}


// 原始对象
const data = {
  a: 1,
  b: 2,
  c: 3,
};
// 代理对象
const state = new Proxy(data, {
  get (target, key) {
    track(target, key);
    return Reflect.get(target, key);
  },
  set (target, key, value) {
    const res = Reflect.set(target, key, value);
    trigger(target, key, value);
    return res;
  }
})

// 清除上次收集的依赖
function cleanUp (environment) {
  const deps = environment.deps;
  console.log('deps', deps);
  deps.forEach(dep => {
    dep.delete(environment);
  })

  for (const [key, deps] of depsMap) {
    console.log('key',key);
    
    if (!deps.size) {
      depsMap.delete(key);
    }
  }

}

function effect (fn) {
  const environment = () => {
    activeEffect = environment;
    activeEffect.deps = []
    fn();
    activeEffect = null;
  }
  environment()
}

// effect(() => {
//   // 这里在访问 a 成员时，会触发 get 方法，进行依赖收集
//   console.log('执行函数')
//   console.log(state.a);
// });

effect(() => {
  if (state.a === 1) {
    state.b;
  } else {
    state.c;
  }
  console.log("执行了函数");
});
state.a = 10;
console.log(depsMap);
