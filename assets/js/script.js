const API_KEY = '2RKX3B5PK69BTLCH';
const baseUrl = 'https://www.alphavantage.co/query?';
let queryFunction = 'TIME_SERIES_INTRADAY';
const searchField = $('#search-bar');
const searchButton = $('#search-btn');
const selectField = $('#int option:selected');
var dateEl = $('#date-refreshed');
var displayTickerEl = $('#display-ticker');
var lastTradeEl = $('#last-trade');
var sharesTradedEl = $('#shares-traded');
var saveBtn = $('#save');
var count = 0;
var removeBtn = $('#remove');

var newYork = moment.tz("America/New_York").format('lll');
console.log(newYork);

var time = $(".time").html(newYork);

/** 
 * Makes a fetch request and returns the stock data with the specified parameters in JSON
 * @param url - The url to send the web request to
 * @param sym - The symbol of the stock to look up
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
      var lastTradePriceOnly = data[`Time Series (${interv}min)`][lastRefreshed]['4. close']; 
      var lastVolume = data[`Time Series (${interv}min)`][lastRefreshed]['5. volume'];

      lastRefreshed = lastRefreshed.split(' ');
      var date = lastRefreshed[0].split('-');
      var dateRefreshed = `${date[1]}/${date[2]}/${date[0]}`;
      displayTickerEl.text(symbol);
      dateEl.text(dateRefreshed);
      lastTradeEl.text("Last Trade Price(usd): $" + parseInt(lastTradePriceOnly).toFixed(2));
      sharesTradedEl.text("Trade volume (# of trades made): " + lastVolume);
      let temp = `${symbol}, ${dateRefreshed}, ${lastTradePriceOnly}, ${lastVolume}`
      console.log(temp);
    })
}
// Capture user input from input forms 
const getUserInput = () => {
  var select = $('#int option:selected').val();
  console.log(select);
  let symbol = searchField.val();
  console.log(`SYM: ${symbol}`);
  getStock(baseUrl, queryFunction, symbol, select)

}

// event handler for search button
const searchButtonHandler = (e) => {
  e.preventDefault(); // keeps page from refreshing on click

  getUserInput();
}

searchButton.on('click', searchButtonHandler);

saveBtn.on('click', function () {
  storeStocks();
  savedStocks();
})

function savedStocks() {
  var windowLoc = window.localStorage;
  var outPut = "";
  if (windowLoc.length > 0) {
    for (i = 1; i <= windowLoc.length; i++) {
      var getSaved = "entry-" + i;
      var localStock = localStorage.getItem(getSaved);
      outPut += "<span class='local-links'>" + localStock + "</span>";
    }
    $('#stored-stocks').html(outPut);
    $('.searches').removeClass('hidden');
  }

}

function storeStocks() {
  let sym = searchField.val();
  if (sym !== "") {
    count += 1;
    var saved = "entry-" + count;
    localStorage.setItem(saved, sym);
  }
}
//console.log(`STOCK DATA : ${getStock(baseUrl, queryFunction, 'IBM', 5)}`);

//button test

//runs savedStocks function to check local storage on window refresh
savedStocks(); 
$('.local-links').on('click', function() {
  var saveButton = $(this).text();
  console.log(saveButton);
  getStock(baseUrl, queryFunction, saveButton, 5);
})


removeBtn.on('click', function() {
  var removeButton = displayTickerEl.text();
  //if local storage contains value xyz, then get key name, then localStorage.removeItem(key)
  //pull all values from local storage, then compare the values with the 
  var myArray = []
  for ( var i = 1; i <= localStorage.length; i++ ) {
    console.log( localStorage.getItem( localStorage.key("entry-" + i ) ) );
    var array = localStorage.getItem(localStorage.key("entry-" + i));
    myArray.push(array);
    console.log(myArray);
  }
  
})
