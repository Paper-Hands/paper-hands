const baseUrl2 = 'https://www.alphavantage.co/query?'
const API_KEY2 = '2RKX3B5PK69BTLCH';
const apiFunction = 'DIGITAL_CURRENCY_DAILY';
const marketCurrency = 'USD';

/** 
 * Makes a fetch request and returns the stock data with the specified parameters in JSON
 * @param url - The url to send the web request to
 * @param func - The time series to use
 * @param interval - the time interval between data points. Default value is 5 if not given
*/
const getCrypto = (url, func, symbol, market) => {
    let req = `${url}function=${func}&symbol=${symbol}&market=${market}&apikey=${API_KEY2}`
    console.log(req);
}

getCrypto(baseUrl2, apiFunction, 'ETH', 'USD');