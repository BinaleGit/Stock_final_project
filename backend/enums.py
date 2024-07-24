 
# C:\Users\Mor\Desktop\fina\Stocke_poke\backend\enums.py
from enum import Enum

class StockMarket(Enum):
    SP500 = "S&P 500"
    TASE = "TA-125"

class DataSource(Enum):
    YAHOO_FINANCE = "Yahoo Finance"
    WIKIPEDIA = "Wikipedia"


class NewsSource(Enum):
    YAHOO_FINANCE = "Yahoo Finance"
    GOOGLE_NEWS = "Google News"

class SearchMode(Enum):
    SENTENCE = 1
    WINDOW = 2