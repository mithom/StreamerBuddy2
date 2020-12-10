module.exports = {
  root: true,
  rules:{
    "@typescript-eslint/no-explicit-any": ["error", { "ignoreRestArgs": true }]
  },
  env: {
    es2021: true,
    node: true,
    browser: false,
  },
  extends: [
    /** @see https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#recommended-configs */
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  ignorePatterns: [
    'node_modules/**',
    'dist/**',
  ],
}

