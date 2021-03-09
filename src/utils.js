const not = fn => (...args) => !fn(...args);
const and = (...fns) => (...args) => fns.every(fn => fn(...args));

module.exports = {
  not,
  and,
};
