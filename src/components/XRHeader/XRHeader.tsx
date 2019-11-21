import React from 'react';

import './xrHeader.scss';

interface XRHeaderProps {
  toCurrencyValue: string | number;
  toCurrencyName: string;
  fromCurrencyValue: string | number;
  fromCurrencyName: string;
  errorText?: string;
}

const XRHeader: React.FC<XRHeaderProps> = props => {
  const {
    toCurrencyValue,
    toCurrencyName,
    fromCurrencyValue,
    fromCurrencyName,
    errorText
  } = props;

  return (
    <div className="xr-header">
      {toCurrencyValue && !errorText && (
        <h2>
          {`${fromCurrencyValue} ${fromCurrencyName} = ${toCurrencyValue} ${toCurrencyName}`}
        </h2>
      )}
      {errorText && <h2 className="xr-header-error">{errorText}</h2>}
    </div>
  );
};

export default XRHeader;
