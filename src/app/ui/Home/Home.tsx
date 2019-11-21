import React from 'react';
import { XRCalculator } from '../../../containers';

import './home.scss';

const Home: React.FC = () => {
  return (
    <div className="home">
      <h1 className="title">Get Forex Exchange Rate</h1>
      <XRCalculator />
    </div>
  );
};

export default Home;
