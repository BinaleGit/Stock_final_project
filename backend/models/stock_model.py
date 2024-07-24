"""
Module for fetching and storing stock symbols from S&P 500 and TA-125 indices.
"""

import pandas as pd

ALL_STOCKS = []

def fetch_all_stock_symbols():
    """
    Fetches stock symbols from S&P 500 and TA-125 indices from Wikipedia.
    Stores them in ALL_STOCKS as a list of dictionaries.
    """
    global ALL_STOCKS

    # Fetch S&P 500 stocks
    url_sp500 = "https://en.wikipedia.org/wiki/List_of_S%26P_500_companies"
    sp500_table = pd.read_html(url_sp500, header=0)
    sp500_df = sp500_table[0]
    sp500_stocks = sp500_df[['Symbol', 'Security']].to_dict(orient='records')

    # Fetch TA-125 stocks
    url_tase = "https://en.wikipedia.org/wiki/TA-125_Index"
    tase_table = pd.read_html(url_tase, header=0)
    tase_df = tase_table[1]  # Assuming the relevant table is the second one
    tase_df = tase_df.rename(columns={'Name': 'Security'})
    tase_stocks = tase_df[['Symbol', 'Security']].to_dict(orient='records')

    ALL_STOCKS = sp500_stocks + tase_stocks

def get_all_stocks():
    """
    Returns all fetched stocks from ALL_STOCKS.
    """
    return ALL_STOCKS

if __name__ == '__main__':
    fetch_all_stock_symbols()
    print(ALL_STOCKS)  # Print to verify the data fetching
