# C:\Users\Mor\Desktop\fina\Stocke_poke\backend\file_scraper\sp500_scraper.py
"""
Module for scraping S&P 500 stock symbols from Wikipedia.

This module defines a function fetch_sp500_stocks() that scrapes the S&P 500 stock symbols
from a Wikipedia page and returns them as a list of dictionaries.
"""

import pandas as pd

def fetch_sp500_stocks():
    """
    Scrape SP500 stock symbols from Wikipedia and return them as a list of dictionaries.
    """
    url_sp500 = "https://en.wikipedia.org/wiki/List_of_S%26P_500_companies"
    sp500_table = pd.read_html(url_sp500, header=0)
    sp500_df = sp500_table[0]
    sp500_stocks = sp500_df[['Symbol', 'Security']].to_dict(orient='records')
    return sp500_stocks
