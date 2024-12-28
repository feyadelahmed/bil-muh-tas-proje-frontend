import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactContextProvider from './context/reactContext'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import App from './App.jsx'
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

createRoot(document.getElementById('root')).render(
  <>
    <ReactContextProvider>
      <MantineProvider defaultColorScheme='light'>
        <App />
      </MantineProvider>
    </ReactContextProvider>
  </>,
)
