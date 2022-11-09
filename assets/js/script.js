const API_KEY = '2RKX3B5PK69BTLCH';
const baseUrl = 'https://www.alphavantage.co/query?';
let queryFunction = 'TIME_SERIES_INTRADAY';
let interval = '15min';
var activeStock = document.getElementById('display-stock')
const searchField = $('#search-bar');
const searchButton = $('#search-btn');

/** 
 * Makes a fetch request and returns the stock data with the specified parameters in JSON
 * @param url - The url to send the web request to
 * @param func - The time series to use
 * @param interval - the time interval between data points. Default value is 5 if not given
*/
function getStock(url, func, sym, interv = 5) {
  let request = `${url}function=${func}&symbol=${sym}&interval=${interv}min&apikey=${API_KEY}`; // request url
  console.log(request); // log out the request url

  // send get request to the request url
  fetch(request)
    .then(function (response) {
      return response.json(); // returns the response data in json format
    })
    .then(function (data) {
      console.log(data);

      let symbol = data['Meta Data']['2. Symbol'];
      var lastRefreshed = data['Meta Data']['3. Last Refreshed'];
      var lastTradePriceOnly = data['Time Series (5min)'][lastRefreshed]['4. close'];
      var lastVolume = data['Time Series (5min)'][lastRefreshed]['5. volume'];

      console.log(activeStock)
      let temp = `${symbol}, ${lastRefreshed}, ${lastTradePriceOnly}, ${lastVolume}`
      console.log(temp)
      activeStock.textContent = temp
    })
}
// Capture user input from input forms 
const getUserInput = () => {
  const radioButtons = $('input[name="group1"]');
  console.log($("input[type='radio'][name='group1']:checked").val());
  let symbol = searchField.val();
  let interval;
  console.log(`SYM: ${symbol}`);

}

// event handler for search button
const searchButtonHandler = (e) => {
  getUserInput();
}

searchButton.on('click', searchButtonHandler);

console.log(`STOCK DATA : ${getStock(baseUrl, queryFunction, 'IBM', 5)}`);

//button test
﻿
$('.btn').on('click',function() {
    console.log("search");
})