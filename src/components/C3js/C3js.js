import React from 'react';
import { findDOMNode } from 'react-dom';
let c3;

// this is the component from react-c3js on npm
// I made with some modifications because the chart doesn't clean when removing an entry

class C3Chart extends React.Component {
   static get displayName() {
    return 'C3Chart';
  }

  componentDidMount() {
    c3 = require('c3');
    this.updateChart(this.props);
  }

  componentWillReceiveProps(newProps) {

    //  ************ HERE IS THE CODE I ADDED ********************
    // it checks if the column count is lower than before
    // if true, it destroy the chart so it's redrawn with the correct number of entries
    if (this.props.data.columns.length > newProps.data.columns.length) {
      this.destroyChart()
    }
    // ************* ***********************************************
    if (newProps.onPropsChanged) {
      newProps.onPropsChanged(this.props, newProps, this.chart);
    }
    this.updateChart(newProps);
  }

  componentWillUnmount() {
    this.destroyChart();
  }

  destroyChart() {
    try {
      this.chart = this.chart.destroy();
    } catch (err) {
      throw new Error('Internal C3 error', err);
    }
  }

  generateChart(mountNode, config) {
    const newConfig = Object.assign({ bindto: mountNode }, config);
    return c3.generate(newConfig);
  }

  loadNewData(data) {
    this.chart.load(data);
  }

  unloadData() {
    this.chart.unload();
  }

  updateChart(config) {
    if (this.chart) {
      this.destroyChart();
    }
    this.chart = this.generateChart(findDOMNode(this), config);
    this.loadNewData(config.data);
  }

  render() {
    const className = this.props.className
      ? ` ${this.props.className}`
      : '';
    const style = this.props.style
      ? this.props.style
      : {};
    return <div className={className} style={style} />;
  }
}

export default C3Chart;