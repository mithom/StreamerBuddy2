module.exports = {
  root: true,
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
    'types/env.d.ts',
    'node_modules/**',
    'dist/**',
  ],
  rules: {
    /**
     * Having a semicolon helps the optimizer interpret your code correctly.
     * This avoids rare errors in optimized code.
     */
    semi: ['error', 'always'],

    /**
     * This will make the history of changes in the hit a little cleaner
     */
    'comma-dangle': ['warn', 'always-multiline'],

    /**
     * Just for beauty
     */
    quotes: ['warn', 'single'],
    '@typescript-eslint/no-explicit-any': ['error', { 'ignoreRestArgs': true }],
  },
};

