import React from 'react';

import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

import './xrForm.scss';

interface XRFormProps {
  onSubmit: (event: React.FormEvent) => void;
  onChange: (event: any) => any;
  fromCurrencyCode: string;
  fromCurrencyValue: string | number;
  toCurrencyCode: string;
  currencyList: { code: string; name: string }[];
  isFetching: boolean;
}

const XRForm: React.FC<XRFormProps> = props => {
  const {
    onSubmit,
    onChange,
    fromCurrencyCode,
    fromCurrencyValue,
    toCurrencyCode,
    currencyList,
    isFetching
  } = props;

  return (
    <form onSubmit={onSubmit}>
      <div className="xr-form">
        <div className="xr-form-input-row">
          <TextField
            id="from-currency-input"
            className="xr-form-input"
            label="Amount"
            margin="normal"
            variant="outlined"
            name="fromCurrencyValue"
            value={fromCurrencyValue}
            onChange={onChange}
            required
          />
          <FormControl variant="outlined" className="xr-form-select">
            <InputLabel htmlFor="from-currency-select-label">
              From Currency
            </InputLabel>
            <Select
              labelId="from-currency-select-label"
              id="from-currency-select"
              name="fromCurrencyCode"
              value={fromCurrencyCode}
              onChange={onChange}
              native
              required
            >
              <option value="" />
              {renderCurrencyNames(currencyList)}
            </Select>
          </FormControl>
          <FormControl variant="outlined" className="xr-form-select">
            <InputLabel htmlFor="to-currency-select-label">
              To Currency
            </InputLabel>
            <Select
              labelId="to-currency-select-label"
              id="to-currency-select"
              name="toCurrencyCode"
              value={toCurrencyCode}
              onChange={onChange}
              native
              required
            >
              <option value="" />
              {renderCurrencyNames(currencyList)}
            </Select>
          </FormControl>
        </div>
        <Button
          variant="contained"
          className="form-button"
          type="submit"
          disabled={isFetching}
        >
          Calculate Rate
        </Button>
      </div>
    </form>
  );
};

function renderCurrencyNames(list: { code: string; name: string }[]) {
  return list.map((currency: { code: string; name: string }) => {
    return (
      <option key={currency.code} value={currency.code}>
        {currency.name}
      </option>
    );
  });
}

export default XRForm;
