import moment from 'moment'

export default function isStockExchangeOpen(date) {
  return date.day() >= 1 && moment().day() <= 5
    && (date.isBetween(moment('09:30', 'hh:mm'), moment('11:30', 'hh:mm'))
      || date.isBetween(moment('12:30', 'hh:mm'), moment('15:00', 'hh:mm'))
    );
}