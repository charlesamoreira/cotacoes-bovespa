var request = require("request");

module.exports.getCurrentQuote = function (ticker, callback) {
  request("https://finance.yahoo.com/quote/" + ticker + ".sa/", function (
    err,
    res,
    body
  ) {
    if (err) {
      callback(err);
    }

    const main = JSON.parse(
      body.split("root.App.main = ")[1].split(";\n}(this));")[0]
    );
    let quote = {};

    if (
      main.context.dispatcher.stores.QuoteSummaryStore.financialData !==
      undefined
    ) {
      quote.price = parseFloat(
        main.context.dispatcher.stores.QuoteSummaryStore.financialData
          .currentPrice.fmt
      );
      quote.open = parseFloat(
        main.context.dispatcher.stores.QuoteSummaryStore.price.regularMarketOpen
          .fmt
      );
      quote.high = parseFloat(
        main.context.dispatcher.stores.QuoteSummaryStore.price
          .regularMarketDayHigh.fmt
      );
      quote.low = parseFloat(
        main.context.dispatcher.stores.QuoteSummaryStore.price
          .regularMarketDayLow.fmt
      );
      quote.previousClose = parseFloat(
        main.context.dispatcher.stores.QuoteSummaryStore.price
          .regularMarketPreviousClose.fmt
      );
      quote.volume = parseFloat(
        main.context.dispatcher.stores.QuoteSummaryStore.price
          .regularMarketVolume.fmt
      );
      quote.marketChange = parseFloat(
        main.context.dispatcher.stores.QuoteSummaryStore.price
          .regularMarketChange.fmt
      );
      quote.shortName =
        main.context.dispatcher.stores.QuoteSummaryStore.price.shortName;
      quote.longName =
        main.context.dispatcher.stores.QuoteSummaryStore.price.longName;
    }

    callback(null, quote);
  });
};

module.exports.getHistoricalData = function (ticker, callback) {
  let yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  let lastYear = new Date();
  lastYear.setDate(lastYear.getDate() - 365);

  request(
    `https://query1.finance.yahoo.com/v7/finance/download/${ticker}.SA?period1=${Math.round(
      lastYear.getTime() / 1000
    )}&period2=${Math.round(
      yesterday.getTime() / 1000
    )}&interval=1d&events=history&includeAdjustedClose=true`,
    function (err, res, data) {
      if (err) {
        callback(err);
      }

      const quotes = [];

      const lines = data.split("\n");
      for (let i = 1, l = lines.length; i < l; i++) {
        const items = lines[i].split(",");
        quotes.push({
          date: items[0],
          open: Number(items[1]),
          high: Number(items[2]),
          low: Number(items[3]),
          close: Number(items[4]),
          volume: Number(items[6]),
        });
      }

      callback(null, quotes);
    }
  );
};
