interface DateExt {
    date: Date;
    year(): number;
}

class DateExt {
  constructor(date?: Date | string | DateExt) {
    const that: DateExt = this;
    if (!date) {
      that.date = new Date();
    } else if (typeof date === 'string') {
      date = date.replace('-', '/');
      that.date = new Date(date);
    } else if (date instanceof Date) {
      that.date = date;
    } else if (date instanceof DateExt) {
      that.date = date.date;
    } else {
      throw new Error('DateExt：date无法转成合法Date对象');
    }
  }

  year() {
    return this.date.getFullYear();
  }

  month() {
    return this.date.getMonth() + 1;
  }

  day() {
    return this.date.getDate();
  }

  hour() {
    return this.date.getHours();
  }

  min() {
    return this.date.getMinutes();
  }

  subtract(num: number, type: string) {
    if (type === 'year') {
      return new DateExt(`${this.year() - num}/${this.month()}/${this.day()}`);
    } if (type === 'month') {
      const month = this.month();
      const y = Math.floor((num - month) / 12);
      const m = (num - month) % 12;
      return new DateExt(`${this.year() - y}/${m}/${this.day()}`);
    }
    return new DateExt(new Date(Number(this.date) - num * 24 * 3600 * 1000));
  }

  add(num: number, type: string) {
    if (type === 'year') {
      return new DateExt(`${this.year() + num}/${this.month()}/${this.day()}`);
    } if (type === 'month') {
      const month = this.month();
      const y = Math.floor((num + month) / 12);
      const m = (num + month) % 12;
      return new DateExt(`${this.year() + y}/${m}/${this.day()}`);
    }
    return new DateExt(new Date(Number(this.date) + num * 24 * 3600 * 1000));
  }

  isLeapYear(year?: number | string) {
    year = Number(year) || this.year();
    return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
  }
}

export default DateExt;
