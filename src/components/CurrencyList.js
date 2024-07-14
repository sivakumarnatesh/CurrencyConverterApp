import React, { useState, useEffect } from 'react';
import { getCurrencies } from '../api';

const CurrencyList = ({ onSelectCurrency, label }) => {
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    const fetchCurrencies = async () => {
      const data = await getCurrencies();
      setCurrencies(data?.supported_codes ?? '');
    };

    fetchCurrencies();
  }, []);

  return (
    <div>
      <label>{label}</label>
      <select onChange={(e) => onSelectCurrency(e?.target?.value)}>
        {currencies.length > 0 && currencies.map(([code, name]) => (
          <option key={code} value={code}>
            {name} ({code})
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencyList;
