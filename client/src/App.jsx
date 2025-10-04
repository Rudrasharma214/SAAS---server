import React from 'react';
import AppRoute from './routes/AppRoute';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster />
      <AppRoute />
    </>
  );
}

export default App;
