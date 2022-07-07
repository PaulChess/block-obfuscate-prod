import { getToday } from '../utils/index';

export const CalendarTabProps = {
  // 默认选中日期
  defaultSelectDate: {
    type: [String, Date],
    default: () => getToday(),
  },
  totalDays: {
    type: [Number, String],
    default: 14,
  },
  // 是否展示星期几
  showWeekDay: {
    type: Boolean,
    default: true,
  },
  // 图标的位置（包括渐变块）
  position: {
    type: String,
    default: 'left',
  },
  // 是否展示图标
  showIcon: {
    type: Boolean,
    default: true,
  },
  // emit出来的日期分隔符
  seperator: {
    type: String,
    default: '/',
  },
  // 自定义规则
  effectDateRule: {
    type: Function,
    default: () => true,
  },
  // 日历开始时间
  calendarStartDate: {
    type: Date,
    default: () => {
      const now = getToday();
      return new Date(now.getFullYear(), now.getMonth() - 2, now.getDate());
    },
  },
  // 日历结束时间
  calendarEndDate: {
    type: Date,
    default: () => getToday(),
  },
};
