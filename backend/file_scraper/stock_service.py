import csv
import os
import pandas as pd

# Module for scraping S&P 500 stock symbols from Wikipedia.
def fetch_sp500_stocks():
    """
    Scrape SP500 stock symbols from Wikipedia and return them as a list of dictionaries.
    """
    url_sp500 = "https://en.wikipedia.org/wiki/List_of_S%26P_500_companies"
    sp500_table = pd.read_html(url_sp500, header=0)
    sp500_df = sp500_table[0]
    sp500_stocks = sp500_df[['Symbol', 'Security']].to_dict(orient='records')
    return sp500_stocks

# Module for scraping TASE stock symbols from Wikipedia.
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

# Module for managing stock symbols and data retrieval.
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
            })

    # Fetch and append TASE stocks
    try:
        tase_stocks = fetch_tase_stocks()
        ALL_STOCKS.extend(tase_stocks)
    except NameError as e:
        print(f"Error fetching TASE stocks: {e}")

if __name__ == "__main__":
    fetch_all_stock_symbols()
