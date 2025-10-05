import React from 'react';
import AppRoute from './routes/AppRoute';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/themeContext';

function App() {
  return (
    <ThemeProvider>
      <Toaster />
      <AppRoute />
    </ThemeProvider>
  );
}

export default App;
