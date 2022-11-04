const API_KEY = '2RKX3B5PK69BTLCH';
const baseUrl = 'https://www.alphavantage.co/query?';
let queryFunction = 'TIME_SERIES_INTRADAY';
let stockSymbol = 'IBM';
let interval = '15min';
const testApiReqUrl = `${baseUrl}function=${queryFunction}&symbol=${stockSymbol}&interval=${interval}&apikey=${API_KEY}`;
let balls = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo'
console.log(testApiReqUrl);


 const getStock = (func, sym) => {

     fetch(testApiReqUrl)
     .then(res => res.json())
     .then(data => console.log(data))
 }


// fetch(testApiReqUrl)
//   .then((response) => response.json())
//   .then((data) => console.log(data));
// getStock('TIME_SERIES_INTRADAY', 'AMC')
var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=' + API_KEY;
var oldUrl = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&interval=1min&apikey=' + API_KEY;
// $.ajax({
//     url: url,
//     dataType: 'json',
//     contentType: "application/json",
//     success: function(data){
//       console.log(data);
//     }
// });

// fetch(oldUrl)  
// .then(function (res) {
//     return res.json();
// })
// .then(function(data) {
//     console.log(data);
// });

getStock('TIME_SERIES_INTRADAY', 'IBM');