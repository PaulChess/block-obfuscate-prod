/*
 * @Author: liushuai
 * @Date: 2021-07-15 17:34:40
 * @LastEditTime: 2021-07-19 20:57:13
 */
import { mount } from '@vue/test-utils';
import Overlay from '../Overlay.vue';

const m = (props: object = {}) => mount(Overlay, { propsData: { ...props } });
const matchSnap = (fn: (props: object) => any, props: object) => expect(fn(props).html()).toMatchSnapshot();

describe('Overlay', () => {
  /** props */
  it('props show', () => {
    matchSnap(m, { show: true });
    matchSnap(m, { show: false });
  });

  it('props slot', () => {
    matchSnap(m, {
      scopedSlots: {
        default: '<p>{{props.index}},{{props.text}}</p>',
      },
    });
  });
});
