import { isString } from "es-toolkit"
import TimeAgo from "javascript-time-ago"
import en from "javascript-time-ago/locale/en"

TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo("en-US")

export const useTimeAgo = (timestamp: string | number, format?: "twitter") => {
  if (isString(timestamp)) {
    return timeAgo.format(new Date(timestamp), format)
  } else {
    return timeAgo.format(new Date(Number(timestamp) * 1000), format)
  }
}
