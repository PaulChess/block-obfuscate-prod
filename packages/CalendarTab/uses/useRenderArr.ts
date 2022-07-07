/**
 * @description use for getting renderedDateArr
 * @date 2022-01-18
 * @author shenjiaqi@myhexin.com
 */
import {
  watch,
  ref,
  Ref,
} from 'vue-demi';
import { DateType } from '../types';
import { compareDay, formatSigleNumber } from '../../utils/index';

const weekList = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

function getRanges(calendarStartDate: Date, calendarEndDate: Date, effectDateRule: Function) {
  const arr: Date[] = [];
  let cursor = new Date(calendarStartDate);
  do {
    // judge rule
    if (effectDateRule(cursor)) {
      arr.push(cursor);
    }
    cursor = new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate() + 1);
  } while (compareDay(cursor, calendarEndDate) !== 1);
  return arr;
}

function getCurrentIdx(dateRangeArr: Date[], currentDate: Date) {
  // 默认为最后一天，用于当前日期为禁止日期的兜底情况
  let idx = dateRangeArr.length - 1;
  for (let i = 0; i < dateRangeArr.length; i++) {
    const item = dateRangeArr[i];
    if (compareDay(item, currentDate) === 0) {
      idx = i;
      break;
    }
  }
  return idx;
}

function getCalendarTabList(
  totalDays: number,
  dateRangeArr: Date[],
  currentDate: Date,
) {
  if (dateRangeArr.length < totalDays) {
    console.warn('[hxmui]: 日历中的可选日期总数小于传入的展示总天数totalDays');
    return [];
  }
  const dateList: Date[] = [];
  const currentDateIdx = getCurrentIdx(dateRangeArr, currentDate);
  const prevTotalDays = Math.ceil((totalDays - 1) / 2);
  const afterTotalDays = Math.floor((totalDays - 1) / 2);
  let startIndex = 0;
  let endIndex = 0;

  if ((currentDateIdx >= prevTotalDays) && (dateRangeArr.length - 1 - currentDateIdx) >= afterTotalDays) {
    startIndex = (currentDateIdx - prevTotalDays);
    endIndex = (currentDateIdx + afterTotalDays);
  } else if (currentDateIdx < prevTotalDays) {
    startIndex = 0;
    endIndex = totalDays - 1;
  } else {
    startIndex = dateRangeArr.length - totalDays;
    endIndex = dateRangeArr.length - 1;
  }
  for (let i = startIndex; i <= endIndex; i++) {
    dateList.push(dateRangeArr[i]);
  }

  return dateList;
}

export function useRenderArr(
  totalDays: number,
  // Infact we need to use type `Ref<Date>`, However, it will make problem with typescript 3
  currentDate: any,
  effectDateRule: Function,
  seperator: string,
  calendarStartDate: Date,
  calendarEndDate: Date,
  eventFromClick: Ref<boolean>,
) {
  let dateList: Date[] = [];
  let cachedList: Date[] = [];
  const dateRangeArr = getRanges(calendarStartDate, calendarEndDate, effectDateRule);
  const renderedDateArr: Ref<DateType[]> = ref([]);

  function updateRenderedDateArr() {
    if (dateList.length === 0 || eventFromClick.value === false) {
      dateList = getCalendarTabList(totalDays, dateRangeArr, currentDate.value);
      cachedList = dateList;
    } else {
      dateList = cachedList;
    }
    // This is a hack deal, we need to know where is the event from: click tab or choose calendar
    eventFromClick.value = false;

    for (let i = 0; i < (dateList as Date[]).length; i++) {
      const item = (dateList as Date[])[i];
      const year = item.getFullYear();
      const month = formatSigleNumber(item.getMonth() + 1);
      const day = formatSigleNumber(item.getDate());
      const weekDay = item.getDay();
      renderedDateArr.value.splice(i, 1, {
        id: i,
        weekDay,
        weekDayName: weekList[weekDay],
        month,
        day,
        date: year + seperator + month + seperator + day,
        formattedDate: item,
      });
    }
  }

  // Why use `currentDate.value.getTime()` not `currentDate`?
  // Because `Date` is a reference type, it will dispatch twice when we click CalendarTab item.
  // So we need a specific value to watch it to ensure the method will only be disapatched onece.
  watch(() => currentDate.value.getTime(), () => {
    updateRenderedDateArr();
  }, { immediate: true });

  return {
    renderedDateArr,
  };
}
