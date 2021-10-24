import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';

import Routes from './routes'

import './global.css';

function App() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
