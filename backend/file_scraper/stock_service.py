"""
Module for managing stock symbols and data retrieval.
"""

import csv
import os
import pandas as pd

try:
    from file_scraper.sp500_scraper import fetch_sp500_stocks
    from file_scraper.tase_scraper import fetch_tase_stocks
except ImportError:
    # Handle ImportError appropriately if necessary
    pass

ALL_STOCKS = []
CSV_FILE_PATH = "csv_files/all_stocks.csv"

def fetch_all_stock_symbols():
    """
    Fetches all stock symbols from different sources and saves them to a CSV file.
    """
    global ALL_STOCKS

    # Check if the CSV file already exists
    if os.path.exists(CSV_FILE_PATH):
        print(f"Loading data from {CSV_FILE_PATH}")
        ALL_STOCKS = pd.read_csv(CSV_FILE_PATH).to_dict(orient='records')
    else:
        # Fetch the stock symbols
        try:
            sp500_stocks = fetch_sp500_stocks()
            tase_stocks = fetch_tase_stocks()
            ALL_STOCKS = sp500_stocks + tase_stocks

            # Save the data to CSV file
            print(f"Saving data to {CSV_FILE_PATH}")
            pd.DataFrame(ALL_STOCKS).to_csv(CSV_FILE_PATH, index=False)
        except NameError as e:
            print(f"Error fetching stocks: {e}")

def load_all_stocks():
    """
    Loads all stocks from a CSV file and appends TASE stocks.
    """
    global ALL_STOCKS
    ALL_STOCKS = []
    with open('csv_files/all_stocks_new.csv', newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            ALL_STOCKS.append({
                "Symbol": row["Symbol"],
                "Security": row["Security"],
                "Exchange": row.get("Exchange", ""),
                "Sector": row.get("Sector", ""),
                "Industry": row.get("Industry", "")
            })

    # Fetch and append TASE stocks
    try:
        tase_stocks = fetch_tase_stocks()
        ALL_STOCKS.extend(tase_stocks)
    except NameError as e:
        print(f"Error fetching TASE stocks: {e}")

if __name__ == "__main__":
    fetch_all_stock_symbols()
