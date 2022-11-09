const API_KEY = '2RKX3B5PK69BTLCH';
const baseUrl = 'https://www.alphavantage.co/query?';
let queryFunction = 'TIME_SERIES_INTRADAY';
let interval = '15min';
// var activeStock = $('.display-stock');
var activeStock = document.getElementById('display-stock')
let searchField = $('.user-input');
/** 
 * Makes a fetch request and returns the stock data with the specified parameters in JSON
 * @param url - The url to send the web request to
 * @param func - The time series to use
 * @param interval - the time interval between data points. Default value is 5 if not given
*/
 function getStock(url, func, sym, interv=5) {

    // const testApiReqUrl = `${url}function=${func}&symbol=${sym}&interval=${interv}min&apikey=${API_KEY}`;
    let responseData = [];
    let request = `${url}function=${func}&symbol=${sym}&interval=${interv}min&apikey=${API_KEY}`;
    let res = [];

    console.log(request);

    fetch(request)
      .then(function (response) {
        return response.json();
      })
    .then(function(data){
        console.log(data);
        let symbol = data['Meta Data']['2. Symbol'];
        var lastRefreshed = data['Meta Data']['3. Last Refreshed'];
        var lastTradePriceOnly = data['Time Series (5min)'][lastRefreshed]['4. close'];
        var lastVolume = data['Time Series (5min)'][lastRefreshed]['5. volume'];
        
     console.log(symbol + ', ' + lastRefreshed + ', ' + lastTradePriceOnly + ', ' + lastVolume);
    console.log(activeStock)
    let temp = `${symbol}, ${lastRefreshed}, ${lastTradePriceOnly}, ${lastVolume}`
    console.log(temp)
    // activeStock.appendChild(temp)
    activeStock.textContent = temp
    })
}
// Capture user input from input forms 
const getUserInput = () => {

}
 
console.log(`STOCK DATA : ${getStock(baseUrl, queryFunction, 'IBM', 5)}`);

 //function() {}

//let testStock = getStock(baseUrl, queryFunction, 'IBM', 5);
//console.log(testStock);
//console.log(getStock(baseUrl, queryFunction, 'IBM', 5));

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

//button test
﻿
$('.btn').on('click',function() {
    console.log("search");
})
