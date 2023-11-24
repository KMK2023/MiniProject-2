import { useState, useEffect } from 'react';

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('SGD');
  const [toCurrency, setToCurrency] = useState('USD');
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState();

  useEffect(() => {
    // Fetch the list of currencies
    
    fetch('https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_NaHrbEjc4DFUqmdAUDSy6uji9roGhmpYw1euVg8h')
    .then((response) => response.json())
    .then((data) => {
      console.log("updated data",data);
      const currencyList = Object.keys(data.data);
      setCurrencies([data.base, ...currencyList]);
      setExchangeRate(data.data[toCurrency]);
    })
    .catch((error) => console.error('Error fetching data:', error));
  }, [toCurrency]);

    //This is a dummy API for checking only.
    // fetch('https://open.er-api.com/v6/latest')
    //   .then((response) => response.json())
    //   .then((data) => {
    //     // console.log("data",rate);
    //     const currencyList = Object.keys(data.rates);
    //     setCurrencies([data.base, ...currencyList]);
    //     setExchangeRate(data.rates[toCurrency]);
    //   })


  useEffect(() => {
    // Update the converted amount when the amount or exchange rate changes
    if (exchangeRate) {
      setConvertedAmount((amount * exchangeRate).toFixed(2));
    }
  }, [amount, exchangeRate]);

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  return (
  <div style={{ backgroundColor: '#d2d2b6', color: 'black', border: 'solid' }}>
    <div>
      <h2>Currency Converter for my travel budget for 1 Person</h2>
      <div>
        <label>From Currency:</label>
        <select value={fromCurrency} onChange={handleFromCurrencyChange}>
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>To Currency:</label>
        <select value={toCurrency} onChange={handleToCurrencyChange}>
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Amount:</label>
        <input type="number" value={amount} onChange={handleAmountChange} />
      </div>
      <div>
        <p>
          {amount} {fromCurrency} is equal to {convertedAmount} {toCurrency}
        </p>
      </div>
    </div>
  </div>
  );
};

export default CurrencyConverter;
