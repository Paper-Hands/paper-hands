const API_KEY = '2RKX3B5PK69BTLCH';
const baseUrl = 'https://www.alphavantage.co/query?';
let queryFunction = 'TIME_SERIES_INTRADAY';
let interval = '15min';

/** 
 * Makes a fetch request and returns the stock data with the specified parameters in JSON
 * @param url - The url to send the web request to
 * @param func - The time series to use
 * @param interval - the time interval between data points. Default value is 5 if not given
*/
 const getStock = (url, func, sym, interv=5) => {
    // const testApiReqUrl = `${url}function=${func}&symbol=${sym}&interval=${interv}min&apikey=${API_KEY}`;
     fetch(`${url}&function=${func}&symbol=${sym}&interval=${interv}min&apikey=${API_KEY}`)
     .then(res => res.json())
     .then(data => console.log(data))
 }

getStock(baseUrl, queryFunction, 'APE', 5);

