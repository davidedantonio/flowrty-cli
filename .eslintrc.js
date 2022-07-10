module.exports = {
  env: {
    browser: false,
    commonjs: true,
    es2021: true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
  },
  ignorePatterns: [
    '/generators/flowrty-mfe/template/src/*.js'
  ]
}
