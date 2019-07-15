import React, { PureComponent } from 'react';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

import C3Chart from '../C3js/C3js';

import './LineChart.css';
import 'c3/c3.css';

const moment = extendMoment(Moment);

class LineChart extends PureComponent {
  render() {
    // creating the horizontal axis scale, and formatting column data
    let columns = [
      [
        'x',
        ...Array.from(moment.range(this.props.startDate, this.props.endDate).by('days'))
          .filter((day) => day.day() !== 0 && day.day() !== 6) // remove Saturdays and Sundays
          .map((day) => day.format('YYYY-MM-DD'))
      ],
      ...Object.values(this.props.data).map((company) => [company.name, ...company.values.map((day) => day.close)])
    ];

    const formattedData = {
      x: 'x',
      xFormat: '%Y-%m-%d',
      columns,
    };

    return (
      <C3Chart
        data={formattedData}
        axis={{
          x: { type: 'timeseries', tick: { format: '%Y-%m-%d', rotate: -45, culling: { max: 30 } } },
          y: { min: 0, padding: { top: 0, bottom: 0 } }
        }}
        padding={{ bottom: 100 }}
        point={{ show: false }}
        size={{ height: 500 }}
      />
    );
  }
}

export default LineChart;