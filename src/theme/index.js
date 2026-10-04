import { createContext, useContext, createElement } from 'react'
import { DARK_THEME } from './dark.js'

// Same API as UNREDACTED's src/theme/index.js. Vendored components and this app
// resolve to this one module, so they share a single context.
const ThemeCtx = createContext(DARK_THEME)

export const useTheme = () => useContext(ThemeCtx)

export const ThemeProvider = ({ children, theme = DARK_THEME }) =>
  createElement(ThemeCtx.Provider, { value: theme }, children)

export { DARK_THEME }
export default ThemeCtx
