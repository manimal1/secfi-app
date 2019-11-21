import React from 'react';

import { LineChart } from '..';

interface XRChartProps {
  xrChartDays: string[] | string;
  xrChartValues: number[] | string;
  fromCurrencyCode: string;
  toCurrencyCode: string;
}

const XRChart: React.FC<XRChartProps> = props => {
  const {
    fromCurrencyCode,
    toCurrencyCode,
    xrChartValues,
    xrChartDays
  } = props;

  const data: object = {
    labels: xrChartDays,
    datasets: [
      {
        label: `${fromCurrencyCode}-${toCurrencyCode}`,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderColor: '#D500F9',
        pointBackgroundColor: 'red',
        pointBorderColor: 'blue',
        borderWidth: '2',
        lineTension: 0.1,
        data: xrChartValues
      }
    ]
  };
  const options: object = {
    responsive: true,
    maintainAspectRatio: true
  };

  return <LineChart {...{ data, options }} />;
};

export default XRChart;
