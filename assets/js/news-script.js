const API_KEY = '2RKX3B5PK69BTLCH';
const newsFeed = 'https://www.alphavantage.co/query?';
let queryFunction = 'NEWS_SENTIMENT';
let tickers = 'COIN,CRYPTO:BTC,FOREX:USD';
//var activeStock = document.getElementById('display-stock') threw errors lines 40, 46
const searchField = $('#search-bar');
const searchButton = $('#search-btn');
const selectField = $('#int option:selected');
var dateEl = $('#date-refreshed');
var displayTickerEl = $('#display-ticker');
var lastTradeEl = $('#last-trade');
var sharesTradedEl = $('#shares-traded');
/** 
 * Makes a fetch request and returns the stock data with the specified parameters in JSON
 * @param url - The url to send the web request to
 * @param func - The time series to use
 * @param interval - the time interval between data points. Default value is 5 if not given
*/
function getNewsFeed(url, func, sym, interv = 5) {
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
      var lastTradePriceOnly = data['Time Series (5min)'][lastRefreshed]['4. close']; // causes error
      var lastVolume = data['Time Series (5min)'][lastRefreshed]['5. volume'];
      /////////////////////////
      lastRefreshed = lastRefreshed.split(' ');
      var date = lastRefreshed[0].split('-');
      var dateRefreshed = `${date[1]}/${date[2]}/${date[0]}`;
      displayTickerEl.text(symbol);
      //console.log(activeStock)
      dateEl.text(dateRefreshed);
      lastTradeEl.text("Last Trade Price(usd): $" + parseInt(lastTradePriceOnly).toFixed(2));
      sharesTradedEl.text("Trade volume (# of trades made): " + lastVolume);
      let temp = `${symbol}, ${dateRefreshed}, ${lastTradePriceOnly}, ${lastVolume}`
      console.log(temp)
      //activeStock.textContent = temp
    })
}
// Capture user input from input forms 
const getUserInput = () => {
  var select = $('#int option:selected').val();
  console.log(select);
  let symbol = searchField.val();
  let interval;
  console.log(`SYM: ${symbol}`);
  getStock(baseUrl, queryFunction, symbol, select)

}

// event handler for search button
const searchButtonHandler = (e) => {
  e.preventDefault(); // keeps page from refreshing on click

  getUserInput();
}

searchButton.on('click', searchButtonHandler);

//console.log(`STOCK DATA : ${getStock(baseUrl, queryFunction, 'IBM', 5)}`);

//button test
// $('.search-btn').on('click', function () {
//   console.log("search");
// })
