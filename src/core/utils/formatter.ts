import moment from "moment/moment";

export default class Formatters {
  static formatDateTime(value: string | null) {
    if (!value) return "";
    const date = moment(value);
    return date.isValid() ? moment(value).format("L LT") : "";
  }

  static formatDateTimeSecond(value: Date | null) {
    if (!value) return "";
    const date = moment(value);
    return date.isValid() ? moment(value).format("L LTS") : "";
  }

  static formatUTCDateTime(value: Date | null) {
    if (!value) return "";
    const date = moment(value);
    return date.isValid() ? moment(value).utc().format("L HH:mm") : "";
  }

  static formatShortUTCDateTime(value: Date | null) {
    if (!value) return "";
    const date = moment(value);
    return date.isValid() ? moment(value).utc().format("MMM DD, HH:mm") : "";
  }

  static formatCustomTime(value: Date | null, format: string) {
    if (!value) return "";
    const date = moment(value);
    return date.isValid() ? moment(value).utc().format(format) : "";
  }

  static formatUTCDate(value: Date | null) {
    if (!value) return "";
    const date = moment(value);
    return date.isValid() ? moment(value).utc().format("L") : "";
  }

  static addDaysToCurrent = (days: number, format = "YYYY/MM/DD") => {
    const current = new Date();
    const newD = current.setDate(current.getDate() + days);
    const date = moment(newD);
    return date.isValid() ? moment(newD).utc().format(format) : "";
  };

  static phoneFormatter(value: string | null) {
    if (!value) {
      return value;
    }
    const s = value.toString();
    return `(${s[1] + s[2] + s[3]}) ${s[4] + s[5] + s[6]}-${
      s[7] + s[8] + s[9] + s[10]
    }`;
  }
}
