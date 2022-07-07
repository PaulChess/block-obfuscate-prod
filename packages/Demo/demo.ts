import { cloneDeep } from 'lodash-es';

export default {
  name: 'hxm-demo',
  props: {
    configs: {
      default() {
        return {};
      },
    },
    btn: {
      default() {
        return false;
      },
    },
  },
  render(h: any): any {
    const that: any = this;
    const { componentOptions } = that.$slots.default[0];
    const { listeners = {} } = componentOptions;
    let config = {};
    if (that.$route.query.id) {
      if (that.configs) {
        config = that.configs[that.$route.query.id] || {};
        if (config['listeners']) {
          for (const name of Object.keys(config['listeners'])) {
            listeners[name] = config['listeners'][name];
          }
        }
      }
      let props = cloneDeep(componentOptions.propsData);
      props = Object.assign(props, config);
      return h('div', [
        h('h2', props.demoTitle),
        h('p', {
          class: 'demo-btn card-bg',
          domProps: {
            innerText: props.demoBtnText,
            style: (this as any).btn ? '' : 'display: none',
          },
          on: {
            click: () => {
              props.btnClick(this);
            },
          },
        }),
        h(componentOptions.tag, { props, on: listeners }),
      ]);
    }
    const demos = [];
    for (const [k, v] of Object.entries(that.configs)) {
      const value: any = v;
      let props = cloneDeep(componentOptions.propsData);
      const newListeners = cloneDeep(listeners);
      if (value.listeners) {
        for (const name of Object.keys(value.listeners)) {
          newListeners[name] = value.listeners[name];
        }
      }
      props = Object.assign(props, value);
      demos.push(h('div', { props: { key: k } }, [
        h('div', { class: ['flex'] }, [
          h('h2', value.demoTitle),
          h('h2', {
            class: 'demo-copy',
            domProps: { innerText: '复制地址' },
            on: {
              click: () => {
                (window as any).clipboard(`${window.location.href}?id=${k}`);
                that.$toast('复制成功');
              },
            },
          }),
        ]),
        h('p', {
          class: 'demo-btn card-bg',
          domProps: {
            innerText: props.demoBtnText,
            style: (this as any).btn ? '' : 'display: none',
          },
          on: {
            click: () => {
              props.btnClick(this);
            },
          },
        }),
        h(componentOptions.tag, { props, on: newListeners }, props.demoWithSolt ? componentOptions.children : []),
      ]));
    }
    return h('div', demos);
  },
};
