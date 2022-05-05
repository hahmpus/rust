import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import request  from './utils/request';

function App() {

  const [counter, setCounter] = useState(0);

  request("GET", '/api/willys/101232590_ST', null, null, (data, code) => {
    if(code === 200) {
      console.log(data)
    }
  })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> didrik skaffa ssd.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
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
