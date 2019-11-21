import { getForex } from '../../utils';

import { FOREX } from './forexXR.constants';
import currencies from './currenciesData/forexCurrencies.json';

import {
  ForexData,
  ForexChartData,
  formatXrData,
  formatXrChartData
} from '../../utils/formatForexKeys';

const { FX_XR, FX_DAILY, FX_API_KEY, FX_CHART_SIZE_COMPACT } = FOREX;

export const getForexXR = async (
  from_currency = '',
  to_currency = ''
): Promise<ForexData> => {
  const params = {
    function: FX_XR,
    from_currency: from_currency,
    to_currency: to_currency,
    apikey: FX_API_KEY
  };

  try {
    const response = await getForex(params);
    const data = formatXrData(response);
    return data.rate;
  } catch (err) {
    return err;
  }
};

export const getForexDaily = async (
  from_symbol = '',
  to_symbol = ''
): Promise<ForexChartData> => {
  const params = {
    function: FX_DAILY,
    from_symbol: from_symbol,
    to_symbol: to_symbol,
    apikey: FX_API_KEY,
    outputsize: FX_CHART_SIZE_COMPACT
  };

  try {
    const response: any = await getForex(params);
    const data = formatXrChartData(response);
    return data;
  } catch (err) {
    return err;
  }
};

export const getCurrencies = (): { code: string; name: string }[] => {
  let list: Array<{ code: string; name: string }> = [];

  Object.entries(currencies).forEach(([key, value]) => {
    list.push({ code: key, name: value });
  });

  return list;
};
