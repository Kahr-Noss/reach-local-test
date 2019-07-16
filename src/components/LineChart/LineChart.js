import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

import C3Chart from '../C3js/C3js';

import './LineChart.css';
import 'c3/c3.css';

const moment = extendMoment(Moment);

// this component format the data to display them with C3js
// it's a pure component to update only when it's needed
class LineChart extends PureComponent {
  render() {
    // creating the horizontal axis scale, and formatting column data
    let columns = [
      [
        'x', // horizontal axis
        ...Array.from(moment.range(this.props.startDate, this.props.endDate).by('days'))
          .filter((day) => day.day() !== 0 && day.day() !== 6) // remove Saturdays and Sundays
          .map((day) => day.format('YYYY-MM-DD'))
      ],
      // companies data
      ...Object.values(this.props.data).map((company) => [company.name, ...company.values.map((day) => day.close)])
    ];

    const formattedData = {
      x: 'x',
      xFormat: '%Y-%m-%d',
      columns,
    };

    return (
      <C3Chart
        className="line-chart"
        data={formattedData}
        axis={{
          x: { type: 'timeseries', tick: { format: '%Y-%m-%d', rotate: -45, culling: { max: 30 } } },
          y: { min: 0, padding: { top: 0, bottom: 0 } }
        }}
        padding={{ bottom: 100 }}
        point={{ show: false }}
        size={{ height: 450 }}
      />
    );
  }
}

LineChart.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    values: PropTypes.arrayOf(PropTypes.shape({
      date: PropTypes.string.isRequired,
      close: PropTypes.number.isRequired,
    })).isRequired,
  }),
  startDate: PropTypes.object.isRequired, //moment object
  endDate: PropTypes.object.isRequired, //moment object
};

export default LineChart;