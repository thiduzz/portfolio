import * as _dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';



export const dayjsRelative = _dayjs.extend(relativeTime);
export const dayjsFormatted = _dayjs.extend(localizedFormat);