var request = require('request');

module.exports.getCurrentQuote = function(ticker, callback){

	request("https://finance.yahoo.com/quote/" + ticker + ".sa/", function(err, res, body){

		if (err) {
			callback(err);
		}

		var main = JSON.parse(body.split("root.App.main = ")[1].split(";\n}(this));")[0]);
		var quote = {};

		if(main.context.dispatcher.stores.QuoteSummaryStore.financialData !== undefined){
			quote.price = parseFloat(main.context.dispatcher.stores.QuoteSummaryStore.financialData.currentPrice.fmt);
			quote.open = parseFloat(main.context.dispatcher.stores.QuoteSummaryStore.price.regularMarketOpen.fmt);
			quote.high = parseFloat(main.context.dispatcher.stores.QuoteSummaryStore.price.regularMarketDayHigh.fmt);
			quote.low = parseFloat(main.context.dispatcher.stores.QuoteSummaryStore.price.regularMarketDayLow.fmt);
			quote.previousClose = parseFloat(main.context.dispatcher.stores.QuoteSummaryStore.price.regularMarketPreviousClose.fmt);
			quote.volume = parseFloat(main.context.dispatcher.stores.QuoteSummaryStore.price.regularMarketVolume.fmt);
			quote.marketChange = parseFloat(main.context.dispatcher.stores.QuoteSummaryStore.price.regularMarketChange.fmt);
			quote.shortName = main.context.dispatcher.stores.QuoteSummaryStore.price.shortName;
			quote.longName = main.context.dispatcher.stores.QuoteSummaryStore.price.longName;
		}	
		
		callback(null, quote);

	});

};