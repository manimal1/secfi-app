import React from 'react';
import { WaveSpinner } from 'react-spinners-kit';

import './spinner.scss';

interface SpinnerProps {
  loading: boolean;
}

const Spinner: React.FC<SpinnerProps> = props => {
  return (
    <div className="spinner">
      <WaveSpinner size={30} color="#D500F9" loading={props.loading} />
    </div>
  );
};

export default Spinner;
