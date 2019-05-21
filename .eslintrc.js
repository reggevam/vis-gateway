module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  plugins: ['jest'],
  extends: ['airbnb-base', 'plugin:jest/recommended'],
  globals: {
    'jest/globals': true,
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'no-console': ['error', { allow: ['info', 'error', 'warn'] }],
    'arrow-parens': ['error', 'as-needed'],
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
  },
};
