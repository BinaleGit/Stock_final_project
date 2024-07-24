import yfinance as yf

symbol = 'AAPL'
stock = yf.Ticker(symbol)
hist = stock.history(period="1mo", interval="1d")

print(hist)  # Print the historical data to verify it's fetched correctly
