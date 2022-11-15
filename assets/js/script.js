/** 
 * Makes a fetch request and returns the stock data with the specified parameters in JSON
 * @param url - The url to send the web request to
 * 
 * Crypto
 * @param func - The time series to use
 * @param symbol - The symbol of the cryptocurrency
 * @param market - The currency of the market you are converting to IE: USD
 * 
 * Stocks
 * @param sym - The symbol of the stock to look up
 * @param func - The time series to use
 * @param interval - the time interval between data points. Default value is 5 if not given
*/

// Request URL
const baseUrl = 'https://www.alphavantage.co/query?'
const API_KEY = '2RKX3B5PK69BTLCH';

// Request crypto function
const apiFunction = 'DIGITAL_CURRENCY_DAILY';
const marketCurrency = 'USD';

// Request stock function
let queryFunction = 'TIME_SERIES_INTRADAY';

// Request news function
const newsFunction = 'NEWS_SENTIMENT';

// Page data
let pageType = $('.page-title h1');
var navCrypto = 'Crypto Currencies';
var navStock = 'Stock Tracker';

// Form data
const searchField = $('#search-bar');
const selectField = $('#int option:selected');
const searchButton = $('#search-btn');

// Symbol data
var dateEl = $('#date-refreshed');
var displayTickerEl = $('#display-ticker');
var lastTradeEl = $('#last-trade');
var sharesTradedEl = $('#shares-traded');
const companyName = $('#company-name');

var saveBtn = $('#save');
var removeBtn = $('#remove');

// Time data
var newYork = moment.tz("America/New_York").format('lll');
var time = $(".nav-time").html(newYork);

// Counters
var count = 0;

// Function to get crypto index data
const getCrypto = (url, func, symbol, market) => {
  let request = `${url}function=${func}&symbol=${symbol}&market=${market}&apikey=${API_KEY}` // request url
  //console.log(`CRYPTO : ${req}`); 

  // send get request to the request url
  fetch(request)
    .then(function (response) {
      return response.json(); // returns the response data in json format
    })
    .then(function (data) {
      const symbol = data['Meta Data']['2. Digital Currency Code'];
      let lastRefreshed = data['Meta Data']['6. Last Refreshed'];
      const cryptoName = data['Meta Data']['3. Digital Currency Name']
      const marketCode = data['Meta Data']['4. Market Code']
      const latestPriceData = data['Time Series (Digital Currency Daily)'];
      lastRefreshed = lastRefreshed.split(' ');
      let date = lastRefreshed[0].split('-')
      let dateString = `${date[0]}-${date[1]}-${date[2]}`
      
      const lastVolume = latestPriceData[dateString]['5. volume']
      const lastTradePriceOnly = data[`Time Series (Digital Currency Daily)`][dateString]['4b. close (USD)']; 
      //var lastVolume = data[`Time Series (Digital Currency Daily)`][lastRefreshed]['5. volume'];
      // lastRefreshed = lastRefreshed.split(' ');
      // var date = lastRefreshed[0].split('-');
      // var dateRefreshed = `${date[1]}/${date[2]}/${date[0]}`;

      displayTickerEl.text(symbol);
      // dateEl.text(dateRefreshed);
      dateEl.text(dateString);
      lastTradeEl.text(`Last Trade Price (USD) $: ${parseFloat(lastTradePriceOnly).toFixed(2)}`);
      sharesTradedEl.text(`Trade volume (# of trades made) : ${parseFloat(lastVolume).toFixed(2)}`)
      //lastTradeEl.text("Last Trade Price(USD): $" + parseInt(lastTradePriceOnly).toFixed(2));
      //sharesTradedEl.text("Trade volume (# of trades made): " + lastVolume);
      //let temp = `${symbol}, ${dateRefreshed}, ${lastTradePriceOnly}, ${lastVolume}`;
    })
}

// Function to get stock index data
const getStock = (url, func, sym, interv = 5) => {
  let request = `${url}function=${func}&symbol=${sym}&interval=${interv}min&apikey=${API_KEY}`; // request url
  //console.log(request);

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
      lastTradeEl.text("Last Trade Price(USD): $" + parseFloat(lastTradePriceOnly).toFixed(2));
      sharesTradedEl.text("Trade volume (# of trades made): " + lastVolume);
      //let temp = `${symbol}, ${dateRefreshed}, ${lastTradePriceOnly}, ${lastVolume}`;
    })
}

const getNews = (url, func, ticker, topics) => {  
  let request = `${url}function=${func}&sort=LATEST&limit=50&apikey=${API_KEY}`; // request url
  fetch(request)
    .then(function (response) {
      return response.json(); // returns the response data in json format
    })
    .then(function (data) {
      for (var i=0; i < data['feed'].length; i++) {
        var title = data['feed'][i].title;
        var feedUrl = data['feed'][i].url;
        var itemWrap = $('.hmove');
        var itemLink = `<div class="hitem"><a href='${feedUrl}'>${title}</a></div>`;

        itemWrap.append(itemLink);
      }
    })
}

// Capture user input from input forms 
const getUserInput = () => {
  var select = $('#int option:selected').val();
  var symbol = searchField.val();
  var cryptoTicker = `COIN,CRYPTO:BTC,FOREX:USD`;
  var topix = '';
  if (pageType.text() === navCrypto) {
    topix = `blockchain,finance,technology`;
    getCrypto(baseUrl, apiFunction, symbol, 'USD');
    getNews(baseUrl, newsFunction, cryptoTicker, topix);
  } else if (pageType.text() === navStock) {
    topix = `ipo,earnings,financial_markets,finance`;
    getStock(baseUrl, queryFunction, symbol, select);
    getNews(baseUrl, newsFunction, symbol, topix);
  } else {
    topix = `ipo,earnings,financial_markets,finance`;
    getStock(baseUrl, queryFunction, symbol, select);
    getNews(baseUrl, newsFunction, symbol, topix);
  }
}

// Event handler for search button
const searchButtonHandler = (e) => {
  e.preventDefault(); // keeps page from refreshing on click
  var select = $('#int option:selected').val();
  var letters = /[A-Za-z]/;
  var error = $('.error-msg');

  // Form validation
  if (pageType.text() === navStock) { // If Stock Tracker
    if (searchField.val() === '' && select === '') { // Force to complete both fields
      error
        .html('We all make mistakes. Please try again.')
        .attr('display', 'block');
      searchField.css('background-color', 'yellow');
      $('.options').css('background-color', 'yellow');
    } else if (searchField.val() === '' && select !== '') {
      error
        .html('Please enter a ticker symbol.')
        .attr('display', 'block');
      searchField.css('background-color', 'yellow');
    } else if (select === '' && searchField.val() !== '') {
      error
        .html('Please select an interval.')
        .attr('display', 'block');
      selectField.css('background-color', 'yellow');
    } else {
      if (!searchField.val().match(letters)) { // Force letters only, no numbers or special characters
        error.text('Please enter a real index symbol.');
      } else {
        getUserInput();
        $('.options').css('background-color', '#ffffff');
        searchField.css('background-color', 'white');
        error.html('').attr('display', 'none');
      }
    }
  } else if (pageType.text() === navCrypto) {// <------------ If Crypto Tracker
    if (searchField.val() === '') { // Force to complete search field
      error
        .html('Please enter a crypto index.')
        .attr('display', 'block');
      searchField.css('background-color', 'yellow');
    } else if (!searchField.val().match(letters)) { // Force letters only, no numbers or special characters
      error.text('Please use letters only.');
    } else {
      getUserInput();
      searchField.css('background-color', '#ffffff');
      error.html('').attr('display', 'none');
    }
  }
}

// Activation to retrieve ticker symbol from localStorage
function savedStocks() {
  var output = "";
  var arr = [];

  if (localStorage.length > 0) {
    for (var i=0; i < localStorage.length; i++) {
      if (localStorage.key(i).substring(0,6) === 'entry-') {
        arr.push(localStorage.key(i));
        $('.searches').removeClass('hide');
      }
    }
    for (var j=0; j < arr.length; j++) {  
      output += "<span class='local-links'>" + localStorage.getItem(arr[j]) + "</span>";
    }
    $('#stored-stocks').html(output);
  }
}

// Activation to store ticker symbol to localStorage
function storeStocks() {
  let sym = searchField.val().toUpperCase(); // Makes all caps
  if (sym !== "") {
    var saved = "entry-" + count;
    localStorage.setItem(saved, sym);
    count += 1;
  }
}

// Button: Search ticker
searchButton.on('click', searchButtonHandler);

// Button: Save ticker symbol to localStorage
saveBtn.on('click', function () {
  storeStocks();
  savedStocks();
});

// Button: Remove ticker from localStorage
removeBtn.on('click', function () {
  //loops through local storage to find matching key
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  console.log(`${key}: ${localStorage.getItem(key)}`);
  //if value matches page refreshes and the stock will be removed
  if (localStorage.getItem(key) === displayTickerEl.text()) {
    console.log("big ole W");
    localStorage.removeItem(key);
    //location.reload();
    $('.notification').text('Index removed from storage.').removeClass('hide');
  } else {
    console.log("not quite");
    console.log(displayTickerEl.text());
    console.log(localStorage.getItem(key));
    $('.notification').addClass('hide');
  }
}
});

// Have stock loaded so user doesn't see an empty page
getStock(baseUrl, queryFunction, 'IBM', 5);

topix = `ipo,earnings,financial_markets,finance`;
getNews(baseUrl, newsFunction, 'IBM', topix);

// Check localStorage on window load/refresh
savedStocks();

// Symbol list populated from localStorage
$('.local-links').on('click', function () {
  var saveButton = $(this).text();
  getStock(baseUrl, queryFunction, saveButton, 5);
});

// Navigation
$('.topnav li').on('click', function () {
  $('.topnav li').removeClass('active');
  $(this).addClass('active');
  pageType.text($('.active span').text());

  if (pageType.text() === navStock) {
    $('.options').css('display', 'block');
  } else {
    $('.options').css('display', 'none');
  }
});

// Init
$(document).ready(function () {
  // Mobile menu
  $('.sidenav').sidenav();

  // Header
  $('.page-title h1').text(navStock);
}); 
