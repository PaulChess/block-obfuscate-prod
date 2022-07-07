/*
 * @Author: liushuai
 * @Date: 2021-07-14 15:51:03
 * @LastEditTime: 2021-07-15 17:07:02
 */
import { mount } from '@vue/test-utils';
import Button from '../Button.vue';

const m = (props: object) => mount(Button, { propsData: { ...props } });
const matchSnap = (fn: (props: object) => any, props: object) => expect(fn(props).html()).toMatchSnapshot();

describe('Button', () => {
  /** event */
  it('should emit click event', async () => {
    const wrapper = mount(Button);

    wrapper.find('button').trigger('click');

    expect(wrapper.emitted().click).toBeTruthy();
    expect(wrapper.emitted().click?.length).toEqual(1);
  });

  it('should not emit click event when disabled', async () => {
    const wrapper = mount(Button, {
      propsData: {
        disabled: true,
      },
    });

    wrapper.find('button').trigger('click');

    expect(wrapper.emitted().click).toBeFalsy();
  });

  it('should not emit click event when loading', () => {
    const wrapper = mount(Button, {
      propsData: {
        loading: true,
      },
    });

    wrapper.find('button').trigger('click');

    expect(wrapper.emitted().click).toBeFalsy();
  });

  /** props */
  it('props loading', () => {
    matchSnap(m, {
      loading: true,
      loadingText: '加载中...',
    });
  });

  it('props custom class', () => {
    matchSnap(m, { customClass: 'attention' });
  });

  it('props type', () => {
    matchSnap(m, { type: 'primary' });
    matchSnap(m, { type: 'plain' });
    matchSnap(m, { type: 'grey' });
    matchSnap(m, { type: 'link' });
  });

  it('props size', () => {
    matchSnap(m, { size: 'large' });
    matchSnap(m, { size: 'medium' });
    matchSnap(m, { size: 'subMedium' });
    matchSnap(m, { size: 'normal' });
    matchSnap(m, { size: 'small' });
    matchSnap(m, { size: 'mini' });
  });

  it('props icon', () => {
    matchSnap(m, { type: 'plain', icon: 'https://testm.10jqka.com.cn/cd/mbweb-vaserviece-strategy-api-container/newjuece_v3/img/top1.89c5c19.png', iconText: '榜1' });
  });

  it('props square', () => {
    matchSnap(m, { square: 'true' });
    matchSnap(m, { round: 'true' });
  });
});
