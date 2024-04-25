import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

dayjs.extend(updateLocale);

dayjs.updateLocale('en', {
  weekdaysShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
  weekdays: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
});

export { dayjs };
