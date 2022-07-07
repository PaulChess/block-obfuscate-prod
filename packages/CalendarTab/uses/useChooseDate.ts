/**
 * @description used for controlling date choose
 * @date 2022-01-18
 * @author shenjiaqi@myhexin.com
 */
import {
  ref,
  computed,
  watch,
  onMounted,
  nextTick,
  Ref,
} from 'vue-demi';
import { DateType } from '../types';
import { compareDay, scrollTo } from '../../utils/index';

const linear = (value: number): number => value;

export function useChooseDate(renderedDateArr: Ref<DateType[]>, currentDate: any) {
  // Dom Ref
  const dateListRef = ref<HTMLElement>();
  const dateItemRef = ref<HTMLElement[]>();
  const activateIndex = ref(0);

  const scrollToView = (allowAnimation: boolean) => {
    const activeItem = (dateItemRef.value as HTMLElement[])[activateIndex.value];
    const panel = (dateListRef.value) as HTMLElement;

    nextTick(() => {
      const distance = (activeItem.offsetLeft
        + activeItem.offsetWidth / 2
        - panel.offsetWidth / 2
      );
      if (allowAnimation) {
        scrollTo(panel, {
          left: distance,
          animation: linear,
        });
      } else {
        panel.scrollLeft = distance;
      }
    });
  };

  watch(renderedDateArr, () => {
    // 默认选中日期为最后一天，用于当前日期为禁止日期的兜底情况
    let index = renderedDateArr.value.length - 1;
    for (let i = 0; i < renderedDateArr.value.length; i++) {
      const item = renderedDateArr.value[i];
      if (compareDay(currentDate.value, item.formattedDate) === 0) {
        index = i;
        break;
      }
    }
    activateIndex.value = index;
  }, { immediate: true });

  // Why we need this flag?
  // Because when we choose a date from bottom calendar, the activateIndex may be the same as before
  // So we need a flag to ensure that every time change we can watch.
  const activateIndexChangeFlag = computed(() => `${activateIndex.value}-${new Date().getTime()}`);
  watch(activateIndexChangeFlag, () => {
    scrollToView(true);
  });

  onMounted(() => {
    scrollToView(false);
  });

  return {
    dateListRef,
    dateItemRef,
    activateIndex,
  };
}
