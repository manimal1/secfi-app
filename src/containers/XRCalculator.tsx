import React, { Component } from 'react';

import { XRForm, XRHeader, XRChart, Spinner } from '../components';

import { getForexXR, getForexDaily, getCurrencies } from '../resources/forexXR';

class XRCalculator extends Component {
  readonly state = {
    currencyList: getCurrencies(),
    fromCurrencyCode: '',
    fromCurrencyValue: 1,
    fromCurrencyName: '',
    toCurrencyCode: '',
    toCurrencyValue: '',
    toCurrencyName: '',
    xRate: '',
    xrChartDays: '',
    xrChartValues: '',
    isFetching: false,
    errorText: '',
    cache: {
      fromCurrencyValue: 0,
      fromCurrencyCode: '',
      toCurrencyCode: '',
      xRate: ''
    }
  };

  // if user only updates XR amount and not currencies, perform XR calculation without API call
  componentDidUpdate(prevProps: any, prevState: any) {
    const {
      fromCurrencyValue,
      fromCurrencyCode,
      toCurrencyCode,
      cache
    } = this.state;
    if (
      prevState.fromCurrencyValue !== fromCurrencyValue &&
      (!!fromCurrencyCode || !!toCurrencyCode)
    ) {
      if (this.isXrCached()) {
        return this.setState({
          toCurrencyValue: this.calculateXrValue(fromCurrencyValue, cache.xRate)
        });
      }
    }
  }

  onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    const { fromCurrencyCode, toCurrencyCode, fromCurrencyValue } = this.state;
    if (this.isXrCached()) return;

    const xrData = await this.getXrData(fromCurrencyCode, toCurrencyCode);
    if (!xrData || !xrData[1]) {
      return this.setState({ errorText: 'Calculation Error!' });
    }

    const { from_currency_name, to_currency_name, exchange_rate } = xrData[1];
    this.setCache(exchange_rate);
    const toCurrencyValue = this.calculateXrValue(
      fromCurrencyValue,
      exchange_rate
    );

    this.setState({
      xrChartDays: xrData[0].days,
      xrChartValues: xrData[0].values,
      fromCurrencyName: from_currency_name,
      toCurrencyName: to_currency_name,
      xRate: exchange_rate,
      toCurrencyValue
    });
  };

  getXrData = async (
    fromCurrencyCode: string,
    toCurrencyCode: string
  ): Promise<any[]> => {
    this.setState({ errorText: '', isFetching: true });
    const xrData = await Promise.all([
      getForexDaily(fromCurrencyCode, toCurrencyCode),
      getForexXR(fromCurrencyCode, toCurrencyCode)
    ]);
    this.setState({ isFetching: false });

    return xrData;
  };

  calculateXrValue = (
    fromCurrencyValue: string | number,
    exchange_rate: string
  ) => {
    return (Number(fromCurrencyValue) * Number(exchange_rate)).toFixed(4);
  };

  isXrCached = (): boolean => {
    const { fromCurrencyCode, toCurrencyCode, cache } = this.state;

    if (
      fromCurrencyCode === cache.fromCurrencyCode &&
      toCurrencyCode === cache.toCurrencyCode
    ) {
      return true;
    }
    return false;
  };

  setCache = (exchange_rate: string) => {
    const { fromCurrencyCode, toCurrencyCode, fromCurrencyValue } = this.state;

    this.setState({
      cache: {
        xRate: exchange_rate,
        fromCurrencyCode,
        toCurrencyCode,
        fromCurrencyValue
      }
    });
  };

  render() {
    const {
      currencyList,
      fromCurrencyCode,
      fromCurrencyValue,
      fromCurrencyName,
      toCurrencyCode,
      toCurrencyValue,
      toCurrencyName,
      xrChartDays,
      xrChartValues,
      isFetching,
      errorText
    } = this.state;
    const onChange = this.onChange;
    const onSubmit = this.onSubmit;

    return (
      <div>
        <XRForm
          {...{
            onChange,
            onSubmit,
            currencyList,
            fromCurrencyCode,
            fromCurrencyValue,
            toCurrencyCode,
            toCurrencyValue,
            isFetching
          }}
        />
        <Spinner loading={isFetching} />
        {!isFetching && (
          <XRHeader
            {...{
              toCurrencyValue,
              toCurrencyName,
              fromCurrencyValue,
              fromCurrencyName,
              errorText
            }}
          />
        )}
        {!isFetching && xrChartValues && (
          <XRChart
            {...{
              xrChartValues,
              xrChartDays,
              fromCurrencyCode,
              toCurrencyCode
            }}
          />
        )}
      </div>
    );
  }
}

export default XRCalculator;
