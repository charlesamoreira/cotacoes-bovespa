# cotacoes-bovespa
Node.js API para obter as cotações da bovespa

[![https://nodei.co/npm/cotacoes-bovespa.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/cotacoes-bovespa.png?downloads=true&downloadRank=true)](https://www.npmjs.com/package/cotacoes-bovespa)

[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/charlesamoreira/cotacoes-bovespa)


# install

```
npm install cotacoes-bovespa
```

# example

```js
var cotacoesBovespa = require('cotacoes-bovespa');


cotacoesBovespa.getCurrentQuote('PETR4', function(err, quote){

	console.log(quote);

});
```

# example historical data

```js
var cotacoesBovespa = require('cotacoes-bovespa');


cotacoesBovespa.getHistoricalData("PETR4", function (err, quotes) {

	console.log(quotes);

});
```

# api

### getCurrentQuote(ticker, callback)

Type: `function`

```ticker``` string (stock ticker symbol)

```callback``` function

Returns quote for ticker symbol. 

### quote

Type: `object`

Price objects.

### quote.price

Type: `number`

Current price of stock.

### quote.open

Type: `number`

Opening price of stock.

### quote.high

Type: `number`

Highest price of stock.

### quote.low

Type: `number`

Lowest price of stock.

### quote.previousClose

Type: `number`

Closing price of stock at last day.

### quote.volume

Type: `number`

Volume of stock traded.

### quote.marketChange

Type: `number`

Market Change percent of stock at day.

### quote.shortName

Type: `string`

Short name of company.

### quote.longName

Type: `string`

Long name of company

# license

MIT © [Charles Almeida](https://github.com/charlesamoreira)