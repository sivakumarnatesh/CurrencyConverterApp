import axios from 'axios';

const API_KEY = '6a18fa111e93ffa48ebd7f36';
const BASE_URL = 'https://v6.exchangerate-api.com/v6';

export const getCurrencies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/${API_KEY}/codes`);
    return response?.data;
  } catch (error) {
    console.error('Error fetching currencies', error);
    handleApiError(error);
  }
};

export const getExchangeRate = async (baseCurrency, targetCurrency, date) => {
  try {
   const str = new Date(date);
   const year = str.getFullYear();
   const month = str.getMonth()+1;
   const day = str.getDate();

    const endpoint = date ? `${BASE_URL}/${API_KEY}/history/${baseCurrency}/${year}/${month}/${day}` : `${BASE_URL}/${API_KEY}/latest/${baseCurrency}`;
    const response = await axios.get(endpoint);
    return response?.data?.conversion_rates[targetCurrency];
  } catch (error) {
    console.error('Error fetching exchange rate', error);
    handleApiError(error);
  }
};

const handleApiError = (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API Error:', error.response.data);
      if (error.response.data['error-type'] === 'plan-upgrade-required') {
        console.error('Plan upgrade required. Please check your API plan.');
        alert('Plan upgrade required. Please check your API plan.');
      } else {
        console.error('An error occurred:', error.response.data['error-type']);
        alert(`An error occurred: ${error.response.data['error-type']}`);
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error', error.message);
    }
  };