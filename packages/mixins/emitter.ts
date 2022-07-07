import { VueConstructor } from 'vue/types/umd';

// 向上查找最近的一个指定 name 的组件实例
export function findComponentUpward(context: InstanceType<VueConstructor>, componentName: string): InstanceType<VueConstructor> | null {
  const parent = context.$parent;
  if (parent) {
    const { name } = parent.$options;
    if (name === componentName) {
      return parent;
    }
    return findComponentUpward(parent, componentName);
  }
  return null;
}
// 向上查找所有指定 name 的组件实例
export function findComponentsUpward(context: InstanceType<VueConstructor>, componentName: string): InstanceType<VueConstructor>[] {
  const components: InstanceType<VueConstructor>[] = [];
  let parent = context.$parent;
  while (parent) {
    if (parent.$options.name === componentName) {
      components.push(parent);
    }
    parent = parent.$parent;
  }
  return components;
}
// 向下查找最近的一个指定 name 的组件实例
export function findComponentDownward(context: InstanceType<VueConstructor>, componentName: string): InstanceType<VueConstructor> | null {
  const childrens = context.$children;
  if (childrens && childrens.length) {
    for (const children of childrens) {
      if (children.$options.name === componentName) {
        return children;
      }
      const child = findComponentDownward(children, componentName);
      if (child) {
        return child;
      }
    }
  }
  return null;
}
// 向下查找所有指定 name 的组件实例
export function findComponentsDownward(context: InstanceType<VueConstructor>, componentName: string): InstanceType<VueConstructor>[] {
  return context.$children.reduce((components: InstanceType<VueConstructor>[], child: InstanceType<VueConstructor>) => {
    if (child.$options.name === componentName) {
      components.push(child);
    }
    components.push(...findComponentsDownward(child, componentName));
    return components;
  }, []);
}
// 查找所有指定 name 的兄弟组件实例
export function findBrothersComponents(context: InstanceType<VueConstructor>, componentName: string, includeSelf = true): InstanceType<VueConstructor>[] {
  const parent = context.$parent;
  if (parent && parent.$children) {
    return parent.$children.reduce((components: InstanceType<VueConstructor>[], child: InstanceType<VueConstructor>) => {
      if (child.$options.name === componentName) {
        if (includeSelf || context !== child) {
          components.push(child);
        }
      }
      return components;
    }, []);
  }
  return [];
}

export default {
  methods: {
    // 向指定 name 的父组件通知
    dispatch(this: InstanceType<VueConstructor>, componentName: string, eventName: string, params: any) {
      const targetCom = findComponentUpward(this, componentName);
      if (targetCom) {
        targetCom.$emit(eventName, params);
      }
    },
    // 向指定 name 的所有子组件通知
    broadcast(this: InstanceType<VueConstructor>, componentName: string, eventName: string, params: any) {
      const targetComs = findComponentsDownward(this, componentName);
      if (targetComs) {
        targetComs.forEach((targetCom) => {
          targetCom.$emit(eventName, params);
        });
      }
    },
  },
};
