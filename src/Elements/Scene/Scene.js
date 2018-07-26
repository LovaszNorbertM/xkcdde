import React, { Component } from 'react';
import threeEntryPoint from './threejs/threeEntryPoint';
export default class ThreeContainer extends Component {
  componentDidMount() {
    threeEntryPoint(this.threeRootElement);
  }
  render() {
    return (
      <div style={{ width: window.innerWidth, height: window.innerHeight }} ref={element => this.threeRootElement = element} />
    );
  }
}