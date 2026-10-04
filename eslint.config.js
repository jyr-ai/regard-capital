import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'

const NO_UPSTREAM = {
  patterns: [{ group: ['**/upstream/**'], message: 'Import upstream code through adapters/ so upstream drift is absorbed in one place.' }],
}

export default [
  { ignores: ['dist/**', 'upstream/**', 'node_modules/**'] },
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,mjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: { 'react-hooks': reactHooks },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^[A-Z_]' }],
    },
  },
  {
    // The adapter layer is the only code allowed to reach into upstream/.
    files: ['src/**/*.{js,jsx}', 'server/**/*.js', 'middleware.js', 'api/**/*.js'],
    rules: { 'no-restricted-imports': ['error', NO_UPSTREAM] },
  },
  {
    files: ['**/*.cjs'],
    languageOptions: { sourceType: 'commonjs', ecmaVersion: 'latest', globals: { ...globals.node } },
  },
  {
    files: ['**/*.test.js'],
    languageOptions: { globals: { ...globals.node } },
  },
]
