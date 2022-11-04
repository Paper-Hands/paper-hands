const API_KEY = '2RKX3B5PK69BTLCH';
const baseUrl = 'https://www.alphavantage.co/query?';
let queryFunction = 'TIME_SERIES_INTRADAY_EXTENDED';
let stockSymbol = 'AMC';
let interval = '15min';
const testApiReqUrl = `${baseUrl}function=${queryFunction}&symbol=${stockSymbol}&interval=${interval}&apikey=${API_KEY}`;
console.log(testApiReqUrl);


// const getStock = (func, sym) => {

//     fetch(testApiReqUrl)
//     .then(res => res.json())
//     .then(data => console.log(data))
// }


fetch(testApiReqUrl)
  .then((response) => response.json())
  .then((data) => console.log(data));
// getStock('TIME_SERIES_INTRADAY', 'AMC')