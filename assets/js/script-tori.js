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

// Request Crypto URL
const cryptoUrl = 'https://www.alphavantage.co/query?'
const API_KEY2 = '2RKX3B5PK69BTLCH';
const apiFunction = 'DIGITAL_CURRENCY_DAILY';
const marketCurrency = 'USD';

// Request Stock URL
const API_KEY = '2RKX3B5PK69BTLCH';
const baseUrl = 'https://www.alphavantage.co/query?';
let queryFunction = 'TIME_SERIES_INTRADAY';

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
var saveBtn = $('#save');
var removeBtn = $('#remove');

// Time data
var newYork = moment.tz("America/New_York").format('lll');
var time = $(".nav-time").html(newYork);

// Counters
var count = 0;

// Function to get crypto index data
const getCrypto = (url, func, symbol, market) => {
  let req = `${url}function=${func}&symbol=${symbol}&market=${market}&apikey=${API_KEY2}` // request url
  //console.log(`CRYPTO : ${req}`); 

  // send get request to the request url
  fetch(req)
    .then(function (response) {
      return response.json(); // returns the response data in json format
    })
    .then(function (data) {
      let symbol = data['Meta Data']['2. Digital Currency Code'];
      var lastRefreshed = data['Meta Data']['6. Last Refreshed'];
      //var lastTradePriceOnly = data[`Time Series (Digital Currency Daily)`][lastRefreshed]['4a. close']; 
      //var lastVolume = data[`Time Series (Digital Currency Daily)`][lastRefreshed]['5. volume'];

      lastRefreshed = lastRefreshed.split(' ');
      var date = lastRefreshed[0].split('-');
      var dateRefreshed = `${date[1]}/${date[2]}/${date[0]}`;
      displayTickerEl.text(symbol);
      dateEl.text(dateRefreshed);
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
      lastTradeEl.text("Last Trade Price(USD): $" + parseInt(lastTradePriceOnly).toFixed(2));
      sharesTradedEl.text("Trade volume (# of trades made): " + lastVolume);
      //let temp = `${symbol}, ${dateRefreshed}, ${lastTradePriceOnly}, ${lastVolume}`;
    })
}

// Capture user input from input forms 
const getUserInput = () => {
  var select = $('#int option:selected').val();
  var symbol = searchField.val();
  if (pageType.text() === navCrypto) {
    getCrypto(cryptoUrl, apiFunction, symbol, 'USD');
  } else if (pageType.text() === navStock) {
    getStock(baseUrl, queryFunction, symbol, select);
  } else {
    getStock(baseUrl, queryFunction, symbol, select);
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
        .attr('display','block');        
      searchField.css('background-color','yellow');
      $('.options').css('background-color','yellow');
    } else if (searchField.val() === '' && select !== '') {
      error
        .html('Please enter a ticker symbol.')
        .attr('display','block');
      searchField.css('background-color','yellow');
    } else if (select === '' && searchField.val() !== '') {
      error
        .html('Please select an interval.')
        .attr('display','block');
      selectField.css('background-color','yellow');
    } else {
      if (!searchField.val().match(letters)) { // Force letters only, no numbers or special characters
        error.text('Please enter a real index symbol.');
      } else {
        getUserInput();
        $('.options').css('background-color','#ffffff');
        searchField.css('background-color','white');
        error.html('').attr('display','none');
      }
    }
  } else if (pageType.text() === navCrypto) {// <------------ If Crypto Tracker
    if (searchField.val() === '') { // Force to complete search field
      error
        .html('Please enter a crypto index.')
        .attr('display','block');
      searchField.css('background-color','yellow');
    } else if (!searchField.val().match(letters)) { // Force letters only, no numbers or special characters
      error.text('Please use letters only.');
    } else {
      getUserInput();
      searchField.css('background-color','#ffffff');
      error.html('').attr('display','none');
    }
  }
  savedStocks();
}

// Button: Search ticker
searchButton.on('click', searchButtonHandler);

// Button: Save ticker symbol to localStorage
saveBtn.on('click', function () {
  //storeStocks();
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


// Activation for saved searches list from localStorage
// Activation to store ticker symbol to localStorage and populate saved searches list from localStorage
function savedStocks() {
  var windowLoc = window.localStorage;
  var sym = displayTickerEl.text();
  var outPut = "";

  console.log(windowLoc.key(1) + ', ' + localStorage.getItem(windowLoc.key(1)));

  if (windowLoc.length > 0) {
    for (i = 0; i < windowLoc.length; i++) {
      console.log('display: ' + sym + ',  localStorage: ' + localStorage.getItem(windowLoc.key(i)));

      if (sym === localStorage.getItem(windowLoc.key(i))) {
        console.log('match');
      }
      var entry = windowLoc.key(i);      
      //var saved = "entry-" + i;
      var localStock = localStorage.getItem(entry);
      //console.log(entry + ', ' + localStock);
    }
    /*  if (entry === localStorage.getItem(windowLoc.key(i))) { // the values
        console.log('yes')
      } else {
        console.log(entry + ', ' + saved)
      }*/
      //newEntry = entry.split('-');
      //console.log(newEntry);


      // if (newEntry[1].match(entry)) {
      //   console.log(true);
      // } else {
      //   console.log(false);
      // }
        // store  
        /*      
        count += 1;
        var saved = "entry-" + count;
        localStorage.setItem(saved, sym);
      } else {
        var saved = "entry-" + count;
        localStorage.setItem(saved, sym);
        count += 1;

      }*/

  // get
    //}
    /*
    for (i = 0; i <= windowLoc.length; i++) {
      var getSaved = "entry-" + i;
      var localStock = localStorage.getItem(getSaved);
      outPut += "<span class='local-links'>" + localStock + "</span>";
    }
    $('#stored-stocks').prepend(outPut);*/
    $('.searches').removeClass('hidden');
  }
}

// Activation to store ticker symbol to localStorage
// function storeStocks() {
//   let sym = displayTickerEl.text(); // Makes all caps
//   var saved = "entry-" + count;
//   localStorage.setItem(saved, sym);
//   count += 1;
// }

// Check localStorage on window load/refresh
savedStocks(); 

// Symbol list populated from localStorage
$('.local-links').on('click', function() {
  var saveButton = $(this).text();
  getStock(baseUrl, queryFunction, saveButton, 5);
});

// Navigation
$('.topnav li').on('click', function() {
  $('.topnav li').removeClass('active');
  $(this).addClass('active');
  pageType.text($('.active span').text());

  if (pageType.text() === navStock) {
    $('.options').css('display','block');
  } else {
    $('.options').css('display','none');
  }
});

// Init
$(document).ready(function(){
  // Mobile menu
  $('.sidenav').sidenav(); 

  // Header
  $('.page-title h1').text(navStock);

/*
  for (i=0;i<localStorage.length;i++) {
    var entry = localStorage.key(i);
    console.log( entry );
    if(entry.match(/entry-/)) {
      console.log(`hi ${localStorage.getItem(entry.match(/entry-/)) } ` );
    }
  }*/
}); 
