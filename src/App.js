import React, { Component } from 'react';
import './App.css';
import ThreeContainer from './Elements/Scene/Scene'
class App extends Component {

  render() {
    return (
      <div className="App">
        <ThreeContainer style={{ width: window.innerWidth, height: window.innerHeight }} />
      </div>
    );
  }
}

export default App;
