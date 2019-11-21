import React from 'react';
import { Line } from 'react-chartjs-2';

import './lineChart.scss';

interface LineChartProps {
  data: object;
  options?: object;
}

const LineChart: React.FC<LineChartProps> = props => (
  <div className="line-chart">
    <Line data={props.data} options={props.options} />
  </div>
);

export default LineChart;
