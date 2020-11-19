var stockPrices = require("../cotacoes-bovespa.js");

stockPrices.getCurrentQuote("PETR4", function (err, quote) {
  console.log(quote);
});

stockPrices.getHistoricalData("PETR4", function (err, quotes) {
  console.log(quotes);
});
