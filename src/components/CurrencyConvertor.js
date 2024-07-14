import React, { useState } from 'react';
import { getExchangeRate } from '../api';
import CurrencyList from './CurrencyList';
import DateSelector from './DateSelector';

const CurrencyConverter = () => {
  const [sourceCurrency, setSourceCurrency] = useState('USD');
  const [targetCurrency, setTargetCurrency] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [date, setDate] = useState('');

  const handleConvert = async () => {
    const rate = await getExchangeRate(sourceCurrency, targetCurrency, date);
    setConvertedAmount(amount * rate);
  };

  return (
    <div>
      <h1>Currency Converter</h1>
      <CurrencyList label="From" onSelectCurrency={setSourceCurrency} />
      <CurrencyList label="To" onSelectCurrency={setTargetCurrency} />
      <div>
        <label>Amount</label>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </div>
      <DateSelector onSelectDate={setDate} />
      <button onClick={handleConvert}>Convert</button>
      {convertedAmount && (
        <div>
          <h2>Converted Amount: {convertedAmount}</h2>
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;
