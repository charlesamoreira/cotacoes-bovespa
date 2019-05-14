var stockPrices = require('../cotacoes-bovespa.js');

stockPrices.getCurrentQuote('PETR4', function(err, quote){

	console.log(quote);

});