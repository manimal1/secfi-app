const axios = require('axios').default;

export const forex = axios.create({
  baseURL: 'https://www.alphavantage.co/'
});

export const getForex = async (params: object): Promise<any> => {
  try {
    const query = await forex.get('/query', { params });
    return query.data;
  } catch (err) {
    return err;
  }
};
