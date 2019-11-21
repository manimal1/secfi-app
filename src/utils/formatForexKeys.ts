export interface ForexData {
  rate?: any;
  from_currency_code: string;
  from_currency_name: string;
  to_currency_code: string;
  to_currency_name: string;
  exchange_rate: string;
  last_refreshed: string;
  time_zone: string;
  bid_price: string;
  ask_price: string;
}

export interface ForexChartData {
  days: string[];
  values: number[];
}

const keys: any = {
  'Realtime Currency Exchange Rate': 'rate',
  '1. From_Currency Code': 'from_currency_code',
  '2. From_Currency Name': 'from_currency_name',
  '3. To_Currency Code': 'to_currency_code',
  '4. To_Currency Name': 'to_currency_name',
  '5. Exchange Rate': 'exchange_rate',
  '6. Last Refreshed': 'last_refreshed',
  '7. Time Zone': 'time_zone',
  '8. Bid Price': 'bid_price',
  '9. Ask Price': 'ask_price'
};

export const formatXrData = (data: any) => {
  if (!data || typeof data !== 'object') {
    return data;
  }

  let formattedKeys: any = {};
  Object.keys(data).forEach((key: string) => {
    key = key.toString();
    formattedKeys[keys[key] || key] = formatXrData(data[key]);
  });

  return formattedKeys;
};

export const formatXrChartData = (data: any): ForexChartData => {
  if (!data || typeof data !== 'object') {
    return data;
  }

  const resData = data['Time Series FX (Daily)'];
  const monthlyChartDays: string[] = Object.keys(resData).slice(0, 30);
  const monthlyChartValues: any[] = Object.values(resData).slice(0, 30);
  const monthlyRates = monthlyChartValues.map((rates: any) =>
    Number(rates['1. open'])
  );

  return { days: monthlyChartDays, values: monthlyRates };
};
