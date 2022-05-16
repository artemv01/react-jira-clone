module.exports = {
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  ignorePatterns: ['!**/*'],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      rules: {
        'padding-line-between-statements': [
          'warn',
          {blankLine: 'always', prev: '*', next: 'block'},
          {blankLine: 'always', prev: 'block', next: '*'},
          {blankLine: 'always', prev: '*', next: 'return'},
          {blankLine: 'always', prev: 'block-like', next: '*'},
        ],
        '@typescript-eslint/explicit-function-return-type': ['error'],
        indent: ['error', 2],
        'max-len': ['error', {code: 120}],
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      rules: {},
    },
    {
      files: ['*.js', '*.jsx'],
      rules: {},
    },
  ],
};
