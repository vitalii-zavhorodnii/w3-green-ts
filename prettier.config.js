module.exports = {
  printWidth: 85,
  tabWidth: 2,
  trailingComma: 'none',
  singleQuote: true,
  semi: true,
  importOrder: [
    '(^w3ts\\w*)|(^w3ts/globals\\w*)',
    '<THIRD_PARTY_MODULES>',
    '^@segments\\w*',
    '^@triggers\\w*',
    '(^@scripts\\w*)|(^@ui\\w*)',
    '^@helpers\\w*',
    '^@waves\\w*',
    '^@spells\\w*',
    '^@decorations\\w*',
    '^@constants\\w*'
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderParserPlugins: ['typescript', 'decorators-legacy'],
  plugins: ['@trivago/prettier-plugin-sort-imports']
};
