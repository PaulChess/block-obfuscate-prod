<template>
  <div class="hxm-calendar-tab hxmui-fontsize-adapter">
    <div :class="getBemClasses('outer-container')" ref="dateListRef">
      <!-- this ul is used to solve flex and padding-right conflit -->
      <!-- https://blog.csdn.net/weixin_43331469/article/details/108673687 -->
      <ul :class="getBemClasses('date-list')" :style="dateListStyle">
        <li ref="dateItemRef"
          :class="[
            getBemClasses('date-item'),
            { 'active': index === activateIndex }
          ]"
          v-for="(item, index) in renderedDateArr"
          :key="item.date + new Date()"
          @click="chooseTab(item, index)"
        >
          <div :class="getBemClasses('date-item-day')">
            <span :class="getBemClasses('date-item-day-text')">
              {{ item.month }}-{{item.day}}
            </span>
          </div>
          <div :class="getBemClasses('date-item-week')" v-if="showWeekDay">
            <span :class="getBemClasses('date-item-week-text')">
              {{ item.weekDayName }}
            </span>
          </div>
        </li>
      </ul>
    </div>

    <div :class="iconContainerClass">
      <div :class="getBemClasses('linear')"></div>
      <div :class="getBemClasses('icon')" v-if="showIcon" @click="iconClick"></div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed, defineComponent, ref, watch,
} from 'vue-demi';
import { CalendarTabProps } from './props';
import { DateType } from './types';
import {
  createNamespace,
  formatDate,
} from '../utils/index';
import { useRenderArr } from './uses/useRenderArr';
import { useChooseDate } from './uses/useChooseDate';

const [bem] = createNamespace('calendar-tab');

export default defineComponent({
  name: 'hxm-calendar-tab',

  props: CalendarTabProps,

  emits: ['choose', 'iconClick'],

  setup(props, { emit }) {
    const eventFromClick = ref(false);
    // get current active date
    const activeDate = ref<Date>(new Date(formatDate(props.defaultSelectDate)));
    watch(() => props.defaultSelectDate, () => {
      activeDate.value = new Date(formatDate(props.defaultSelectDate));
    });
    // used for get renderDate in view
    const { renderedDateArr } = useRenderArr(
      +props.totalDays,
      activeDate,
      props.effectDateRule,
      props.seperator,
      props.calendarStartDate,
      props.calendarEndDate,
      eventFromClick,
    );
    // used for get current active index and control list animation
    const {
      dateListRef,
      dateItemRef,
      activateIndex,
    } = useChooseDate(renderedDateArr, activeDate);

    const chooseTab = (item: DateType, index: number) => {
      if (index === activateIndex.value) {
        return;
      }
      eventFromClick.value = true;
      activeDate.value = new Date(formatDate(item.date));
      emit('choose', item);
    };

    const iconClick = () => {
      emit('iconClick');
    };

    const dateListStyle = computed(() => {
      const style = {};
      if (props.showIcon) {
        style['paddingRight'] = props.position === 'right' ? '0.49em' : '0.16em';
        style['paddingLeft'] = props.position === 'left' ? '0.49em' : '0.16em';
      } else {
        style['paddingRight'] = '0.16em';
        style['paddingLeft'] = '0.16em';
      }
      return style;
    });

    const iconContainerClass = computed(() => bem('icon-container', {
      [props.position]: props.position,
    }));

    function getBemClasses<T>(params: T) {
      return bem(params);
    }

    return {
      getBemClasses,
      iconContainerClass,
      dateListStyle,
      activateIndex,
      chooseTab,
      dateListRef,
      dateItemRef,
      renderedDateArr,
      iconClick,
    };
  },
});
</script>
