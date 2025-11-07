/**
 * Conditionally joins CSS class names together.
 * @param {...any} classes - Class names to join
 * @returns {string} Combined class names
 */
export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}