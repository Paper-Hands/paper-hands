const cryptoUrl = 'https://www.alphavantage.co/query?'
const API_KEY2 = '2RKX3B5PK69BTLCH';
const apiFunction = 'DIGITAL_CURRENCY_DAILY';
const marketCurrency = 'USD';

/** 
 * Makes a fetch request and returns the stock data with the specified parameters in JSON
 * @param url - The url to send the web request to
 * @param func - The time series to use
 * @param symbol - The symbol of the cryptocurrency
 * @param market - The currency of the market you are converting to IE: USD
*/
const getCrypto = (url, func, symbol, market) => {
    let req = `${url}function=${func}&symbol=${symbol}&market=${market}&apikey=${API_KEY2}` // request url
    console.log(`CRYPTO : ${req}`);
}

getCrypto(cryptoUrl, apiFunction, 'ETH', 'USD');