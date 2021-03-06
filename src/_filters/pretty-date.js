const { DateTime } = require('luxon')

/**
 * Convert a JavaScript Date object into a human readable string.
 * @param {Date} date The date to convert.
 * @return {string|undefined} A human readable date string.
 */
module.exports = (date) => {
  if (!date) {
    /* eslint-disable-next-line */
    console.warn('Date passed to prettyDate filter was undefined or null.')
    return
  }

  return DateTime.fromISO(date.toISOString(), { zone: 'utc' }).toLocaleString(
    DateTime.DATE_MED
  )
}
