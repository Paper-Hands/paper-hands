const API_KEY = '2RKX3B5PK69BTLCH';
const baseUrl = 'https://www.alphavantage.co/query?';
let queryFunction = 'TIME_SERIES_INTRADAY';
let interval = '15min';

// console.log(testApiReqUrl);

// interv expects a number
 const getStock = (url, func, sym, interv) => {
    const testApiReqUrl = `${url}function=${func}&symbol=${sym}&interval=${interv}min&apikey=${API_KEY}`;
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

// getStock(baseUrl, 'TIME_SERIES_INTRADAY', 'APE');
getStock(baseUrl, queryFunction, 'APE', 5);