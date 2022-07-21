import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ActionIcon, AppShell, Button, ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core'
import Navbar from './components/Navbar'
import Recipies from './components/routes/Recipies';

function AppWrapper() {

  return (
      <AppShell
        fixed
        padding={0}
        styles={(theme) => ({
          main: {backgroundColor: theme.colorScheme == 'dark' ? theme.colors.dark[8] : theme.colors.gray[0], color: 'black'},
        })}
        navbar={<Navbar />}
      >
        {/* breadcrumbs??? collapse menu button???*/}
        
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/recipies/" element={<Recipies />} />
        </Routes>

      </AppShell>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
      <MantineProvider theme={{ colorScheme: 'light'}}>
        <BrowserRouter>
          <AppWrapper />
        </BrowserRouter>
      </MantineProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();