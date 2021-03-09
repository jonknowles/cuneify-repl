module.exports = {
  extends: [
    "eslint:recommended"
  ],
  parserOptions: {
    "ecmaVersion": 2019
  },
  env: {
    "browser": true,
    "node": true,
    "es6": true
  },

  rules: {
    "semi": 1
  },
  ignorePatterns: [ "dist" ]
};
