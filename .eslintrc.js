module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: ['next/core-web-vitals'],
  ignorePatterns: ['!**/*'],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      rules: {
        'padding-line-between-statements': [
          'warn',
          { blankLine: 'always', prev: '*', next: 'block' },
          { blankLine: 'always', prev: 'block', next: '*' },
          { blankLine: 'always', prev: '*', next: 'return' },
          { blankLine: 'always', prev: 'block-like', next: '*' },
        ],
        indent: ['error', 2],
        'max-len': ['error', { code: 120 }],
      },
    },
  ],
};
