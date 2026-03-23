import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  function toggleTheme() {
    setIsDark(prev => {
      const newIsDark = !prev;
      document.documentElement.setAttribute(
        'data-theme',
        newIsDark ? 'dark' : 'light'
      );
      return newIsDark;
    });
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}