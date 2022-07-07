# CalendarTab 日历Tab(新) <Badge text="1.11.0+" />

## 简介

<card>

### 介绍

该组件适合于龙虎榜、付费产品等可能出现历史回顾的场景。一般会结合 `Calendar` 日历组件一起使用。

</card>

## 代码演示

<card>

### 基础用法

该组件在使用上较为复杂，在需要和日历联动的情况下，下列展示的代码是需要配置的最小单元，更多细节配置请参照下方的表格。以下为该组件的几点解释说明:  
1. 日历Tab中展示的数据受 `5` 个配置项的控制，分别是: `totalDays`、`defaultSelectDate`、`calendarStartDate`、`calendarEndDate` 以及 `effectDateRule`。  
  1_ `defaultSelectDate`  为当前选中日期，默认是今天，支持字符串类型和 `Date` 类型。  
  2_ `totalDays` 用于设置展示在列表上的有效天数，通过传入 `effectDateRule` 方法可以自定义日期展示的规则(比如周六、周日不展示)。  
  3_ `calendarStartDate` 和 `calendarEndDate` 是弹出日历上的最小日期和最大日期，由于每次选择日历上的日期时都需要更新 Tab 上的数组，因此需要提供这两个参数用以约束范围。  
    
2. `CalendarTab` 与  `Calendar` 组件的 `defaultSelectDate` 属性需要使用同一个变量用于控制当前选中的日期。在 `CalendarTab` 组件的 `choose` 回调方法及 `Calendar` 组件的 `confirm` 回调方法中都需要给该变量赋上当前选中值。 

```html
<hxm-calendar-tab
  :totalDays="14"
  :effectDateRule="effectDateRule"
  :defaultSelectDate="activeDate"
  :calendarStartDate="startDate"
  @choose="chooseTab"
  @iconClick="iconClick">
</hxm-calendar-tab>

<hxm-calendar
  :useDefaultEntry="false"
  v-model="showCalendar"
  :effectDateRule="effectDateRule"
  :defaultSelectDate="activeDate"
  @confirm="confirmDate">
</hxm-calendar>
```
```javascript
function getToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

export default () {
  data() {
    showCalendar: false,
    // 该参数用于控制日历Tab以及日历的当前选中日期
    activeDate: getToday(),
  },
  computed() {
    // 日历的开始日期，这里的值是两个月前的第一天
    startDate() {
      const now = getToday();
      return new Date(now.getFullYear(), now.getMonth() - 2, 1);
    },
    // 日历的结束日期，这里的值是今天
    endDate() {
      return getToday();
    },
  },
  methods: {
    confirmDate(date) {
      this.activeDate = new Date(date);
    },
    chooseTab(item) {
      this.activeDate = item.formattedDate;
    },
    // 自定义日期是否展示的规则，示例方法的含义是周六、日及今日以后的日期
    // 在日历中为禁用状态，在日历Tab中不展示
    effectDateRule(date) {
      date = new Date(date);
      if (date.getDay() === 0
        || date.getDay() === 6
        || date.getTime() > new Date().getTime()
      ) {
        return false;
      }
      return true;
    },
    iconClick() {
      this.showCalendar = true;
    },
  }
}
```

</card>

## API

<card>

### Props

| 参数 | 说明 | 类型 | 默认值 |
|:---|:---|:---:|:---:|
| defaultSelectDate | 当前选中日期 | Date/String | `今日日期` |
| totalDays | 日历列表展示的天数 | Number/String | `14` |
| position | 日历图标的位置，可选值为 `left` `right` | String | `left` |
| showIcon | 是否展示日历图标 | Boolean | `true` |
| effectDateRule | 日期展示的规则方法，详见上例代码 | Function | `() => true` |
| calendarStartDate | 日历的起始时间 | Date | - |
| calendarEndDate | 日历的结束时间 | Date | `今日日期` |
| seperator | emit出来的时间中日期字符串的分隔符 | String | `/` |
| showWeekDay | 日历列表是否展示星期几 | Boolean | `true` |

</card>

<card>

### Events

| 事件名 | 说明 | 回调参数 |
|:---|:---|:---:|
| choose | 选择日历Tab上的日期 | `item: CalendarTabProps` |
| iconClick | 点击日历图标 | - |

</card>

<card>

### CalendarTabProps 数据结构
| 键名 | 说明 | 类型 |
|:---|:---|:---:|
| id | 当前选中日期在日历列表中的索引值 | Number |
| weekDay | 星期值 `0` - `6` | Number |
| weekDayName | 星期名称 `周日` - `周六` | String |
| month | 月份值 | Number |
| day | 日期值 | Number |
| date | 日期，默认格式为 `YYYY/MM/DD`，其中的分隔符可以通过 `seperator` 属性修改 | String |
| formattedDate | 格式化后的日期 | Date |

</card>

<demo />