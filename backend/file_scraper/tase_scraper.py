"""
Module for scraping TASE stock symbols.
"""

import pandas as pd

def fetch_tase_stocks():
    """
    Scrape TASE stock symbols from Wikipedia and return them as a list of dictionaries.
    """
    url_tase = "https://en.wikipedia.org/wiki/TA-125_Index"
    tase_table = pd.read_html(url_tase, header=0)
    tase_df = tase_table[1]  # Assuming the relevant table is the second one
    tase_df = tase_df.rename(columns={'Name': 'Security'})  # Rename 'Name' column to 'Security'
    tase_stocks = tase_df[['Symbol', 'Security']].to_dict(orient='records')
    return tase_stocks
