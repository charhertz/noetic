import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import config from '@/site.config.mjs'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault(config.timeZone)

export default dayjs
