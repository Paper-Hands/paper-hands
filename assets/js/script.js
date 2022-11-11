/** 
 * Makes a fetch request and returns the stock data with the specified parameters in JSON
 * @param url - The url to send the web request to
 * @param sym - The symbol of the stock to look up
 * @param func - The time series to use
 * @param interval - the time interval between data points. Default value is 5 if not given
*/

// Request URL
const API_KEY = '2RKX3B5PK69BTLCH';
const baseUrl = 'https://www.alphavantage.co/query?';
let queryFunction = 'TIME_SERIES_INTRADAY';

// Form data
const searchField = $('#search-bar');
const selectField = $('#int option:selected');
const searchButton = $('#search-btn');

// Symbol data
var dateEl = $('#date-refreshed');
var displayTickerEl = $('#display-ticker');
var lastTradeEl = $('#last-trade');
var sharesTradedEl = $('#shares-traded');
var saveBtn = $('#save');
var removeBtn = $('#remove');

// Time data
var newYork = moment.tz("America/New_York").format('lll');
var time = $(".nav-time").html(newYork);

// Counters
var count = 0;

// Fetch request
function getStock(url, func, sym, interv = 5) {
  let request = `${url}function=${func}&symbol=${sym}&interval=${interv}min&apikey=${API_KEY}`; // request url

  // send get request to the request url
  fetch(request)
    .then(function (response) {
      return response.json(); // returns the response data in json format
    })
    .then(function (data) {
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
      //let temp = `${symbol}, ${dateRefreshed}, ${lastTradePriceOnly}, ${lastVolume}`;
    })
}

// Capture user input from input forms 
const getUserInput = () => {
  var select = $('#int option:selected').val();
  let symbol = searchField.val();
  getStock(baseUrl, queryFunction, symbol, select);
}

// Event handler for search button
const searchButtonHandler = (e) => {
  e.preventDefault(); // keeps page from refreshing on click

  var error = $('.error-msg');
  if (searchField.val() === '' || $('#int option:selected').val() === '') {
    if ($('#int option:selected').val() === '') {
      error
        .html('Please select an interval.')
        .attr('display','block');
      $('.options').css('background-color','yellow');
    }
    if (searchField.val() === '') {
      error
        .html('Please enter a ticker symbol.')
        .attr('display','block');
      searchField.css('background-color','yellow');
    }
  } else {
    getUserInput();
    $('.options').css('background-color','#ffffff');
    searchField.css('background-color','white');
    error
      .html('')
      .attr('display','none');
  }
}


// Activation to retrieve ticker symbol from localStorage
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

// Activation to store ticker symbol to localStorage
function storeStocks() {
  let sym = searchField.val();
  if (sym !== "") {
    count += 1;
    var saved = "entry-" + count;
    localStorage.setItem(saved, sym);
  }
}

// Init
$(document).ready(function(){
  // Mobile menu
  $('.sidenav').sidenav();

  // Check localStorage on window load/refresh
  savedStocks(); 

  // Button: Search ticker
  searchButton.on('click', searchButtonHandler);

  // Button: Save ticker symbol to localStorage
  saveBtn.on('click', function () {
    storeStocks();
    savedStocks();
  });

  // Button: Remove ticker from localStorage
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
  });

  // Have stock loaded so user doesn't see an empty page
  getStock(baseUrl, queryFunction, 'IBM', 5);

  // Symbol list populated from localStorage
  $('.local-links').on('click', function() {
    var saveButton = $(this).text();
    getStock(baseUrl, queryFunction, saveButton, 5);
  })
});
