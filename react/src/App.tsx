import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import request  from './utils/request';

function App() {

  const [counter, setCounter] = useState(0);
  const [data, setData] = useState(null);

  if(!data) {
    request("GET", '/api/willys/101232590_ST', null, null, (data, code) => {
      if(code === 200) {
        console.log('fetched');
        setData(data);
      }
    })
  }

  console.log(data)

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <h1>{counter}</h1>
        <div>
          <button onClick={() => setCounter(counter + 1)}>
            +
          </button>
          <button onClick={() => setCounter(counter - 1)}>
            -
          </button>

        </div>
      </header>
    </div>
  );
}

export default App;
