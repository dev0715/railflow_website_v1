import React from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core';
import './src/styles/fonts.scss';
import './src/styles/global.scss';

export const wrapRootElement = ({ element }) => {
  const theme = createTheme({
    palette: {
      type: 'dark',
    },
  });
  return (
    <div>
      <ThemeProvider theme={theme}>{element}</ThemeProvider>
    </div>
  );
};
