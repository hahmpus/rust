import React, { useState, createContext, Component } from 'react';
import './App.css';
import ProductSummary from './components/product/ProductSummary';
import Recipie from './components/recipie/Recipie';
import { _t } from './utils/translate';


function App() {

  return (
      <div className="App">
          {_t('Hello')}
          {/* <Recipie id="1e43d099-6389-45a2-94fc-b2d5b93b504e" /> */}
      </div>
  );
}

export default App;
