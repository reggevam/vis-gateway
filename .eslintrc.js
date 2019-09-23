module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  plugins: ['jest', 'prettier'],
  extends: ['airbnb-base', 'plugin:jest/recommended', 'prettier'],
  globals: {
    'jest/globals': true,
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'prettier/prettier': ['error'],
    'jest/no-focused-tests': 'warn',
    'no-console': ['error', { allow: ['info', 'error', 'warn'] }],
    'arrow-parens': ['error', 'as-needed'],
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
    'class-methods-use-this': 'allow',
  },
};
