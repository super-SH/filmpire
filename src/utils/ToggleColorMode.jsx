import { ThemeProvider, createTheme } from '@mui/material';
import React, { createContext, useContext, useMemo, useState } from 'react';

const ColorModeContext = createContext();

function ColorModeProvider({ children }) {
  const [mode, setMode] = useState('light');

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={{ mode, setMode, toggleColorMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}

function useColorMode() {
  const context = useContext(ColorModeContext);
  if (context === undefined)
    throw new Error('ColorModeContext was used outside of its provider');
  return context;
}

export { ColorModeProvider, useColorMode };
