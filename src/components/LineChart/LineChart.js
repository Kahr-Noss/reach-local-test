import React from 'react';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

import C3Chart from '../C3js/C3js';

import './LineChart.css';
import 'c3/c3.css';

const moment = extendMoment(Moment);

const LineChart = (props) => {

  // creating the horizontal axis scale
  let columns = [[
    'x',
    ...Array.from(moment.range(props.startDate, props.endDate).by('days'))
      .filter((day) => day.day() !== 0 && day.day() !== 6) // remove Saturdays and Sundays
      .map((day) => day.format('YYYY-MM-DD'))
  ]];

console.log(columns)

  // if data are present, format them to match C3js input pattern
  if (props.data.length > 0 && props.data[0].values && props.data[0].values.length > 0) {
    columns = [
      ...columns,
      ...props.data.map((company) => [company.name, ...company.values.map((day) => day.close)])
    ];
  }

  const formattedData = {
    x: 'x',
    xFormat: '%Y-%m-%d',
    columns,
  };

  console.log(formattedData);

  return (
    <C3Chart
      data={formattedData}
      axis={{
        x: { type: 'timeseries', tick: { format: '%Y-%m-%d', rotate: -45, culling: { max: 30 } } },
        y: { min: 0, padding: { top: 0, bottom: 0 } }
      }}
      padding={{ bottom: 100 }}
      point={{ show: false }}
    />
  );
}

export default LineChart;