import React from 'react';

import './App.css';
import {GameOfLife} from './gameOfLife';


function App() {

  return (
    <div className="App">
      <header className="App-header">
      {GameOfLife()}
      </header>
    </div>
  );
}

export default App;
