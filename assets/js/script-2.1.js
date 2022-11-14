const cryptoUrl = 'https://www.alphavantage.co/query?'
const API_KEY2 = '2RKX3B5PK69BTLCH';
const apiFunction = 'DIGITAL_CURRENCY_DAILY';
const marketCurrency = 'USD';

/** 
 * Makes a fetch request and returns the stock data with the specified parameters in JSON
 * @param url - The url to send the web request to
 * @param func - The time series to use
 * @param symbol - The symbol of the cryptocurrency
 * @param market - The currency of the market you are converting to IE: USD
*/
const getCrypto = (url, func, symbol, market) => {
    let req = `${url}function=${func}&symbol=${symbol}&market=${market}&apikey=${API_KEY2}` // request url
    console.log(`CRYPTO : ${req}`);


    fetch(req)
    .then(res => res.json())
    .then(data => {
        console.log(`Crypto Data: ${data}`);

        const symbol = data['Meta Data']['2. Digital Currency Code']
        const cryptoName = data['Meta Data']['3. Digital Currency Name']
        const marketCode = data['Meta Data']['4. Market Code']
        const latestPriceData = data['Time Series (Digital Currency Daily)'];
        let lastRefreshed = data['Meta Data']['6. Last Refreshed']

        lastRefreshed = lastRefreshed.split(' ');
        let date = lastRefreshed[0].split('-')
        let dateString = `${date[0]}-${date[1]}-${date[2]}`


        console.log(`crypto | sym: ${symbol} | name: ${cryptoName} | market: ${marketCode} | lastRefreshed: ${lastRefreshed} | date: ${date}`);
        console.log(`latest open : ${latestPriceData[dateString]['1a. open (USD)']}`)

        // console.log(latestPriceData);

    })

}

getCrypto(cryptoUrl, apiFunction, 'ETH', 'USD');