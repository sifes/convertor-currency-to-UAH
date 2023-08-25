import React from 'react';
import './index.scss';
const initialCurrencies = [{ "currencyCodeA": 840, "currencyCodeB": 980, "date": 1690405273, "rateBuy": 36.65, "rateCross": 0, "rateSell": 37.4406 },
{ "currencyCodeA": 978, "currencyCodeB": 980, "date": 1690433173, "rateBuy": 40.65, "rateCross": 0, "rateSell": 41.8498 },
{ "currencyCodeA": 985, "currencyCodeB": 980, "date": 1690443992, "rateBuy": 0, "rateCross": 9.4089, "rateSell": 0 },
{ "currencyCodeA": 203, "currencyCodeB": 980, "date": 1690443931, "rateBuy": 0, "rateCross": 1.7282, "rateSell": 0 }, { "currencyCodeA": 826, "currencyCodeB": 980, "date": 1690443976, "rateBuy": 0, "rateCross": 48.448, "rateSell": 0 },]
const currencies = [
  { id: 978, name: 'EUR' },
  { id: 840, name: 'USD' },
  { id: 826, name: 'GBR' },
  { id: 985, name: 'PLN' },
  { id: 203, name: 'CZK' },
];

function App() {
  const [allCurrencies, setAllCurrencies] = React.useState(initialCurrencies);
  const [currencyIndexFrom, setCurrencyIndexFrom] = React.useState(978);
  const [inputValue, setInputValue] = React.useState('');
  React.useEffect(() => {
    fetch('https://api.monobank.ua/bank/currency')
      .then((value) => value.json())
      .then((data) => {
        setAllCurrencies(data)
      })
      .catch((err) => { console.log(err) })
  }, [])
  const currencyFrom = allCurrencies.find(item => item.currencyCodeA === currencyIndexFrom && item.currencyCodeB === 980)
  const curs = currencyFrom.rateCross ? currencyFrom.rateCross : (currencyFrom.rateBuy + currencyFrom.rateSell) / 2

  return (
    <div className="App">
      <div className='convertor'>
        <div className='currencies'>
          <span>Pick the currency</span>
          <ul>
            {currencies.map(currency => (
              <li key={currency.id} onClick={() => setCurrencyIndexFrom(currency.id)} className={currencyIndexFrom === currency.id ? 'active' : ''}>
                {currency.name}
              </li>
            ))}
          </ul>
          <div>
            <input type='number' value={inputValue} onChange={e => {
              setInputValue(e.target.value)
            }} placeholder={'enter the value'} />
          </div>
        </div>
        <div className='currencyTo'>
          <p>in UAH</p>
          <span>{(curs * inputValue).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

export default App;
