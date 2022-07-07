<template>
  <div class="hxmui-calendar hxmui-fontsize-adapter">
    <!-- 入口 -->
    <div :class="getBemClasses('entry')"
      v-if="useDefaultEntry"
      @click="showCalendar = true">
      <div :class="getBemClasses('entry-icon')"></div>
      <div :class="getBemClasses('entry-date')">
        <div :class="getBemClasses('entry-date-text')">{{ renderedActiveDate }}</div>
      </div>
    </div>

    <!-- 日历弹窗 -->
    <hxm-popup
      :show="showCalendar"
      :round="true"
      height="4em"
      position="bottom"
      @overlay-click="handleOverlayClick">
      <div class="hxm-calendar">
        <!-- 标题头部 -->
        <div :class="getBemClasses('header')">
          <div :class="getBemClasses('header-cancel')" @click="cancel">
            <div :class="getBemClasses('header-cancel-text')">取消</div>
          </div>
          <div :class="getBemClasses('header-title')">
            <div :class="getBemClasses('header-title-text')">{{ title }}</div>
          </div>
        </div>
        <!-- 星期栏 -->
        <div :class="getBemClasses('weekdays')">
          <ul :class="getBemClasses('weekdays-list')">
            <li :class="getBemClasses('weekdays-item')"
              v-for="weekName in weekdaysList"
              :key="weekName">
              <div :class="getBemClasses('weekdays-item-text')">
                {{ weekName }}
              </div>
            </li>
          </ul>
        </div>
        <!-- 主体部分 -->
        <div :class="getBemClasses('body')" ref="bodyRef" v-if="showCalendar">
          <div :class="getBemClasses('month')"
            v-for="monthItem in renderedDateArr" :key="monthItem.id" ref="monthListRef">
            <div :class="getBemClasses('month-title')">
              <div :class="getBemClasses('month-title-text')">
                {{ monthItem.year }}年{{ monthItem.month }}月
              </div>
            </div>
            <ul :class="getBemClasses('month-day-list')">
              <li :class="[getBemClasses('month-day-item'), {
                  [getBemClasses('month-day-item--disabled')]: !dayItem.effectDate,
                  [getBemClasses('month-day-item--active')]: dayItem.currentDate
                }]"
                v-for="dayItem in monthItem.days"
                :key="dayItem.id"
                @click="chooseDate(dayItem)">
                <div :class="getBemClasses('month-day-item-text')">
                  {{ dayItem.day }}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </hxm-popup>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  computed,
  watch,
  nextTick,
} from 'vue-demi';
import hxmPopup from '../Popup/index';
import {
  createNamespace,
  getDaysOfOneMonth,
  getFirstWeekDayOfMonth,
  formatDate,
  compareMonth,
  getToday,
  compareDay,
  isTrueArray,
} from '../utils/index';
import { CalendarDay, CalendarDate } from './types';

const weekList = ['日', '一', '二', '三', '四', '五', '六'];

const [bem] = createNamespace('calendar');

const propObj = {
  show: {
    type: Boolean,
    default: false,
  },
  useDefaultEntry: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    default: '选择日期',
  },
  // 开始日期
  startDate: {
    type: Date,
    default: () => {
      const now = getToday();
      return new Date(now.getFullYear(), now.getMonth() - 2, now.getDate());
    },
  },
  // 结束日期
  endDate: {
    type: Date,
    default: () => getToday(),
  },
  defaultSelectDate: Date,
  dateArr: {
    type: Array,
    default: () => [],
  },
  seperatorSign: {
    type: String,
    default: '/',
  },
  effectDateRule: {
    type: Function,
    default: () => true,
  },
};

export default defineComponent({
  name: 'hxmCalendar',
  emits: ['confirm', 'cancel', 'close'],
  model: {
    prop: 'show',
    event: 'close',
  },
  props: propObj,
  components: {
    hxmPopup,
  },
  setup(props, { emit }) {
    const weekdaysList = reactive(weekList);
    const monthBodyRef = ref<HTMLElement>();
    const monthListRef = ref<HTMLElement[]>();
    const showCalendar = ref(props.show);

    // 将用户传入的日期数组格式化为Array<Date>, 便于组件内部对日期统一化处理
    const formattedDateArr = computed(() => {
      if (Array.isArray(props.dateArr) && props.dateArr.length > 0) {
        const arr: Array<Date> = [];
        props.dateArr.forEach((item: string | Date) => {
          arr.push(new Date(formatDate(item)));
        });
        // 当传入的日期数组的第一项日期大于最后一项的日期时，将数组反向
        if (compareDay(arr[0], arr[arr.length - 1]) === 1) {
          arr.reverse();
        }
        return arr;
      }
      return [];
    });

    // 标志是否使用用户传入的日期数组
    const isTrueFormattedDateArr = computed(
      () => isTrueArray(formattedDateArr.value),
    );

    const minDate = computed<Date>(() => (
      isTrueFormattedDateArr.value
        ? formattedDateArr.value[0]
        : props.startDate
    ));

    const maxDate = computed<Date>(() => (
      isTrueFormattedDateArr.value
        ? formattedDateArr.value[formattedDateArr.value.length - 1]
        : props.endDate
    ));

    const judgeIsEffectDate = (date: Date) => {
      let res;

      if (isTrueFormattedDateArr.value) {
        res = formattedDateArr.value.some((item) => compareDay(item, date) === 0);
      } else {
        res = (props.effectDateRule as Function)(date);
      }
      return res;
    };

    const getDefaultActiveDate = (): Date => {
      let res: Date;
      if (isTrueFormattedDateArr.value) {
        const lastData = formattedDateArr.value[formattedDateArr.value.length - 1];
        res = props.defaultSelectDate || lastData;
      } else {
        res = props.defaultSelectDate || getToday();
      }
      // 如果当前日期是禁止日期的话，需要往前推直到找到合法的日期为止
      while (!judgeIsEffectDate(res)) {
        res = new Date(res.getFullYear(), res.getMonth(), res.getDate() - 1);
      }
      return res;
    };

    const activeDate = ref<Date>(getDefaultActiveDate());

    // 日历入口渲染的当前日期
    const renderedActiveDate = computed(
      () => formatDate(activeDate.value as Date, '-'),
    );

    const getDays = (firstWeekday: number, daysOfMonth: number, firstDate: Date) => {
      const arr: Array<CalendarDay> = [];
      // 空时间点
      for (let i = 0; i < firstWeekday; i++) {
        arr.push({
          id: i,
          day: '',
          date: null,
          effectDate: false,
          currentDate: false,
        });
      }
      for (let j = 0; j < daysOfMonth; j++) {
        const date = new Date(firstDate.getFullYear(), firstDate.getMonth(), j + 1);
        arr.push({
          id: (j + firstWeekday + 1),
          day: (j + 1),
          date,
          effectDate: judgeIsEffectDate(date),
          currentDate: compareDay(activeDate.value as Date, date) === 0,
        });
      }
      return arr;
    };

    // 最终用于渲染日历的数据
    const renderedDateArr = computed(() => {
      const arr: Array<CalendarDate> = [];
      const cursor = new Date(minDate.value);
      cursor.setDate(1);
      do {
        const firstWeekday = getFirstWeekDayOfMonth(cursor);
        const daysOfMonth = getDaysOfOneMonth(cursor);
        arr.push({
          id: `${cursor.getFullYear()}-${cursor.getMonth() + 1}`,
          monthDate: new Date(cursor.getFullYear(), cursor.getMonth(), 1),
          month: cursor.getMonth() + 1,
          year: cursor.getFullYear(),
          days: getDays(firstWeekday, daysOfMonth, cursor),
        });
        cursor.setMonth(cursor.getMonth() + 1);
      } while (compareMonth(cursor, maxDate.value) !== 1);
      return arr;
    });

    // 将当前选中的月份展示在可视区域
    const scrollToDate = (targetDate: Date) => {
      let idx = 0;
      renderedDateArr.value.forEach((item, index) => {
        if (compareMonth(targetDate, item.monthDate) === 0) {
          idx = index;
        }
      });
      nextTick(() => {
        const month = (monthListRef.value as HTMLElement[])[idx];
        month.scrollIntoView();
      });
    };

    // 监听v-model show变化
    watch(() => props.show, (val: boolean) => {
      showCalendar.value = val;
    }, { immediate: true });

    // 监听showCalendar
    watch(showCalendar, (val: boolean) => {
      if (val) {
        scrollToDate(activeDate.value as Date);
      }
    }, { immediate: true });

    watch(() => props.defaultSelectDate, () => {
      activeDate.value = getDefaultActiveDate();
    });

    watch(() => props.dateArr, () => {
      activeDate.value = getDefaultActiveDate();
    });

    const cancel = () => {
      showCalendar.value = false;
      emit('cancel');
      emit('close', false);
    };

    const handleOverlayClick = () => {
      cancel();
    };

    const chooseDate = (item: CalendarDay) => {
      if (!item.day || !item.effectDate) return;
      showCalendar.value = false;
      activeDate.value = item.date as Date;
      emit('confirm', formatDate(activeDate.value as Date, props.seperatorSign));
      emit('close', false);
    };

    const getBemClasses = (params: any) => bem(params);

    return {
      showCalendar,
      cancel,
      chooseDate,
      renderedActiveDate,
      renderedDateArr,
      weekdaysList,
      monthListRef,
      monthBodyRef,
      handleOverlayClick,
      getBemClasses,
    };
  },
});
</script>
