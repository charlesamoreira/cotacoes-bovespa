var request = require('request');

module.exports.getCurrentQuote = function(ticker, callback){

	request("https://finance.yahoo.com/quote/" + ticker + ".sa/", function(err, res, body){

		if (err) {

			callback(err);

		}

		var main = JSON.parse(body.split("root.App.main = ")[1].split(";\n}(this));")[0]);

		var quote = {};
		quote.currentPrice = parseFloat(main.context.dispatcher.stores.QuoteSummaryStore.financialData.currentPrice.fmt);
		quote.regularMarketOpen = parseFloat(main.context.dispatcher.stores.QuoteSummaryStore.price.regularMarketOpen.fmt);
		quote.regularMarketDayHigh = parseFloat(main.context.dispatcher.stores.QuoteSummaryStore.price.regularMarketDayHigh.fmt);
		quote.shortName = main.context.dispatcher.stores.QuoteSummaryStore.price.shortName;
		quote.longName = main.context.dispatcher.stores.QuoteSummaryStore.price.longName;
		quote.regularMarketChange = parseFloat(main.context.dispatcher.stores.QuoteSummaryStore.price.regularMarketChange.fmt);
		quote.regularMarketPreviousClose = parseFloat(main.context.dispatcher.stores.QuoteSummaryStore.price.regularMarketPreviousClose.fmt);
		quote.regularMarketDayLow = parseFloat(main.context.dispatcher.stores.QuoteSummaryStore.price.regularMarketDayLow.fmt);
		quote.regularMarketVolume = parseFloat(main.context.dispatcher.stores.QuoteSummaryStore.price.regularMarketVolume.fmt);

		callback(null, quote);

	});

};