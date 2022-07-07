<template>
  <div class="hxm-datepicker hxmui-fontsize-adapter">
    <hxm-picker-wheel
    :data="date"
    :value.sync="current"
    :visible.sync="show"
    :show-modal="showModal"
    @scrollend="scrollEnd"
    :hideHead="hideHead"
    ref='picker'
    @confirm="pickDate"></hxm-picker-wheel>
  </div>
</template>

<script lang="ts">
import {
  Component, Vue, Prop, Watch,
} from 'vue-property-decorator';
import PickerWheel from '../PickerWheel/PickerWheel.vue';
import DateExt from '../utils/date';

@Component({
  name: 'DatePicker',
  components: {
    'hxm-picker-wheel': PickerWheel,
  },
})
export default class Badge extends Vue {
  @Prop({ default: false }) visible!: boolean;

  @Prop({ default: () => new DateExt().subtract(10, 'year') }) startDate!: Date | DateExt;

  @Prop({ default: () => new DateExt() }) endDate!: Date | DateExt;

  @Prop() currentDate?: Date | DateExt;

  @Prop({ default: 'Y,M,D' }) format!: string;

  @Prop({ default: true }) showModal!: boolean;

  @Prop({ default: false }) private hideHead!: boolean;

  // 日期选项
  date: any = {};

  current = {};

  show = false;

  // 记录当前未确认的日期选项
  tempDate = {
    year: '',
    month: '',
    day: '',
    hour: '',
    min: '',
  };

  // 单位
  unit = {
    Y: '',
    M: '',
    D: '',
    h: '',
    m: '',
  }

  monthDict: string[] = [];

  dayDict = {};

  // 闰年
  leapMonth = ['31', '29', '31', '30', '31', '30', '31', '31', '30', '31', '30', '31'];

  // 平年
  ordinaryMonth = ['31', '28', '31', '30', '31', '30', '31', '31', '30', '31', '30', '31'];

  // 把起始日期转换为DateExt对象
  get startDateExt() {
    return new DateExt(this.startDate);
  }

  // 把结束日期转换为DateExt对象
  get endDateExt() {
    return new DateExt(this.endDate);
  }

  get curDate() {
    if (this.date.year) {
      return new DateExt(this.currentDate || this.startDate);
    }
    return new DateExt(this.currentDate || `${new DateExt().year()}1/1 0:0:0`);
  }

  @Watch('visible', { immediate: true })
  visibleWatcher(nv: boolean) {
    this.show = nv;
    if (nv) {
      this.initTempDate();
    }
  }

  @Watch('show')
  showWatcher(nv: boolean) {
    this.$emit('update:visible', nv);
  }

  // 监听起始日期变化，生成日期的年份区间
  @Watch('startDate', { immediate: true })
  dateWatcher(nv: any) {
    if (nv) {
      setTimeout(() => {
        this.initDateOption();
        this.updateOption();
      }, 100);
    }
  }

  // 计算年份数组
  getYears() {
    const startDate = new DateExt(this.startDate);
    const endDate = new DateExt(this.endDate);
    const startY = startDate.year();
    const endY = endDate.year();
    const year = [];
    for (let i = startY; i <= endY; i++) {
      year.push(i + this.unit.Y);
    }
    return year;
  }

  initTempDate() {
    if (this.date.year) {
      this.tempDate = {
        year: String(this.curDate['year']()) + this.unit.Y,
        month: String(this.curDate['month']()) + this.unit.M,
        day: String(this.curDate['day']()) + this.unit.D,
        hour: String(this.curDate['hour']()) + this.unit.h,
        min: String(this.curDate['min']()) + this.unit.m,
      };
    } else {
      this.tempDate = {
        year: String(this.curDate.year()) + this.unit.Y,
        month: this.curDate.month() + this.unit.M,
        day: this.curDate.day() + this.unit.D,
        hour: this.curDate.hour() + this.unit.h,
        min: this.curDate.min() + this.unit.m,
      };
    }
    this.current = {
      year: this.tempDate.year,
      month: this.tempDate.month,
      day: this.tempDate.day,
      hour: this.tempDate.hour,
      min: this.tempDate.min,
    };
  }

  // 初始化选项列表
  initDateOption() {
    const cols = this.format.split(',');
    const days: string[] = [];
    const hour: string[] = [];
    const min: string[] = [];
    const months: string[] = [];
    let tag;
    cols.forEach((key) => {
      // 类型区分
      tag = key.substr(0, 1);
      // 单位
      this.unit[tag] = key.substr(1);
      switch (tag) {
        case 'Y':
          this.$set(this.date, 'year', this.getYears());
          break;
        case 'M':
          for (let i = 1; i <= 12; i++) {
            months.push(i + this.unit.M);
          }
          this.monthDict = months;
          this.leapMonth = this.leapMonth.map((item) => item + this.unit.M);
          this.ordinaryMonth = this.ordinaryMonth.map((item) => item + this.unit.M);
          this.$set(this.date, 'month', []);
          break;
        case 'D':
          for (let i = 1; i <= 31; i++) {
            days.push(i + this.unit.D);
          }
          this.dayDict['28'] = days.slice(0, 28);
          this.dayDict['29'] = days.slice(0, 29);
          this.dayDict['30'] = days.slice(0, 30);
          this.dayDict['31'] = days.slice(0, 31);
          this.$set(this.date, 'day', []);
          break;
        case 'h':
          for (let i = 0; i <= 23; i++) {
            hour.push(i + this.unit.h);
          }
          this.$set(this.date, 'hour', hour);
          break;
        case 'm':
          for (let i = 0; i <= 59; i++) {
            min.push(i + this.unit.m);
          }
          this.$set(this.date, 'min', min);
          break;
        default:
          console.error(`DatePicker: ${tag}不是format的合法入参`);
      }
    });
    this.initTempDate();
  }

  // 动态更新月，日选项数组
  updateOption() {
    // 初始化每月天数数组为平年
    let month: string[] = this.ordinaryMonth;
    const tempDateM = parseInt(this.tempDate.month, 10);
    const tempDateY = parseInt(this.tempDate.year, 10);

    if (tempDateM === 2 && DateExt.prototype.isLeapYear(tempDateY)) {
      // 初每月天数数组改为平年
      month = this.leapMonth;
    }
    // 根据当前月份从字典取出当前月份天数数组
    const day = this.dayDict[parseInt(month[tempDateM - 1], 10)];
    // 初始化月、日截取的首位索引
    let mHead = 0;
    let mTail = 12;
    let dHead = 0;
    let dTail = day.length;
    if (this.date.year) {
      // 如果当前为startDate的年份则更新月份数组起点
      if (tempDateY === this.startDateExt.year()) {
        mHead = this.startDateExt.month() - 1;
        // 如果当前为startDate的月份则更新天数数组起点
        if (tempDateM === this.startDateExt.month()) {
          dHead = this.startDateExt.day() - 1;
        }
      } else if (tempDateY === this.endDateExt.year()) {
        // 如果当前为endDate的年份则更新月份数组终点
        mTail = this.endDateExt.month();
        // 如果当前为endDate的月份则更新天数数组终点
        if (tempDateM === this.endDateExt.month()) {
          dTail = this.endDateExt.day();
        }
      }
    }

    // 根据起始索引从月份数组和天数数组中截取有效区间
    this.date.month = this.monthDict.slice(mHead, mTail);
    this.date.day = day.slice(dHead, dTail);
    if (this.date.year) {
      // this.resetOption('month');
      // this.resetOption('day');
    }
  }

  // 重置选项位置
  resetOption(type: string) {
    if (this.$refs.picker) {
      let index = 0;
      index = this.date[type].indexOf(this.tempDate[type]);
      index = index < 0 ? 0 : index;
      this.tempDate[type] = this.date[type][index];
      this.$refs.picker['wheels'][type]['wheelTo'](index);
    }
  }

  // 每次滚动更新tempDate为当前选中的选项
  scrollEnd(key: string, value: any) {
    this.tempDate[key] = value;
    this.updateOption();
    const tempValue = {};
    for (const k of Object.keys(this.date)) {
      tempValue[k] = this.tempDate[k];
    }
    this.$emit('scrollend', tempValue);
  }

  // 点击确定返回选中结果
  pickDate(item: any) {
    for (const key of Object.keys(item)) {
      this.tempDate[key] = item[key];
    }
    const curDate = new Date(`
      ${parseInt(this.tempDate.year, 10)}/
      ${parseInt(this.tempDate.month, 10)}/
      ${parseInt(this.tempDate.day, 10)}
      ${parseInt(this.tempDate.hour, 10)}:
      ${parseInt(this.tempDate.min, 10)}
    `);
    this.$emit('update:currentDate', curDate);
    this.$emit('pickdate', item);
  }
}
</script>
