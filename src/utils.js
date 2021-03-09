const not = fn => (...args) => !fn(...args);
const and = (...fns) => (...args) => fns.every(fn => fn(...args));

const identity = (x) => x;

module.exports = {
  not,
  and,
  identity,
};
