/**
 * @param {string | number | Date} input - ISO string, epoch ms, or Date
 * @returns {string} e.g. "5 minutes ago", or the original string if unparseable
 */
export function formatTimeAgo(input) {
  const then =
    input instanceof Date ? input : new Date(typeof input === "number" ? input : String(input));
  if (Number.isNaN(then.getTime())) {
    return typeof input === "string" ? input : "";
  }

  let diffSec = Math.floor((Date.now() - then.getTime()) / 1000);
  if (diffSec < 0) diffSec = 0;

  if (diffSec < 60) {
    return diffSec === 1 ? "1 second ago" : `${diffSec} seconds ago`;
  }

  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) {
    return diffMin === 1 ? "1 minute ago" : `${diffMin} minutes ago`;
  }

  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) {
    return diffHr === 1 ? "1 hour ago" : `${diffHr} hours ago`;
  }

  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 7) {
    return diffDay === 1 ? "1 day ago" : `${diffDay} days ago`;
  }

  const diffWeek = Math.floor(diffDay / 7);
  if (diffDay < 30) {
    return diffWeek === 1 ? "1 week ago" : `${diffWeek} weeks ago`;
  }

  const diffMonth = Math.floor(diffDay / 30);
  if (diffDay < 365) {
    return diffMonth === 1 ? "1 month ago" : `${diffMonth} months ago`;
  }

  const diffYear = Math.floor(diffDay / 365);
  return diffYear === 1 ? "1 year ago" : `${diffYear} years ago`;
}
