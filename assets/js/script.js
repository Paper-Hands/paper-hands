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
    let responseData = [];
    let request = fetch(`${url}&function=${func}&symbol=${sym}&interval=${interv}min&apikey=${API_KEY}`)
    .then(res => res.json())
    .then(data => data['Meta Data'])
    .then(data2 => {
        responseData.push(data2['2. Symbol'])
    })

 }

let testStock = getStock(baseUrl, queryFunction, 'IBM', 5);
console.log(testStock);
console.log(getStock(baseUrl, queryFunction, 'IBM', 5));

// class StockData {
//     symbol; // symbol of the stock
//     timeSeries; // time series 
//     constructor() {

//     }

//     printData() {

//     }
// }

// class CryptoData {
//     symbol; // symbol of cryptocurrency; for example symbol=BTC
//     timeSeries; // time series; for example timeSeries = CRYPTO_INTRADAY
//     market; // market to convert crypto to; for example market=USD

//     constructor() {

//     }
//     printData() {

//     }
// }
