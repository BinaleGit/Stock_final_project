import requests
from bs4 import BeautifulSoup
from enums import NewsSource
from datetime import datetime

class ScraperFactory:
    @staticmethod
    def get_scraper(source, query, page=1):
        if source == NewsSource.GOOGLE_NEWS:
            return GoogleNewsScraper(query, page)
        elif source == NewsSource.YAHOO_FINANCE:
            return YahooFinanceScraper(query, page)
        else:
            raise ValueError("Unknown news source")

class GoogleNewsScraper:
    def __init__(self, query, page=1):
        self.query = query
        self.page = page

    def scrape(self):
        url = f"https://news.google.com/search?q={self.query}&hl=en-IL&gl=IL&ceid=IL%3Aen"
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')

        articles = []
        for item in soup.select('article'):
            title = item.select_one('h3').text if item.select_one('h3') else 'No title'
            link = item.select_one('a')['href'] if item.select_one('a') else 'No link'
            if link.startswith('./'):
                link = 'https://news.google.com' + link[1:]
            image = item.select_one('img')['src'] if item.select_one('img') else None
            date_str = item.select_one('time')['datetime'] if item.select_one('time') else '1970-01-01'
            date = datetime.strptime(date_str.split('T')[0], '%Y-%m-%d')
            articles.append({"title": title, "url": link, "image": image, "date": date.strftime('%Y-%m-%d')})

        return articles

class YahooFinanceScraper:
    def __init__(self, query, page=1):
        self.query = query
        self.page = page

    def scrape(self):
        url = f"https://finance.yahoo.com/news/?p={self.query}&page={self.page}"
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')

        articles = []
        for item in soup.select('article'):
            title = item.select_one('h3').text if item.select_one('h3') else 'No title'
            link = item.select_one('a')['href'] if item.select_one('a') else 'No link'
            if not link.startswith('https://'):
                link = 'https://finance.yahoo.com' + link
            date_str = item.select_one('time')['datetime'] if item.select_one('time') else '1970-01-01'
            date = datetime.strptime(date_str.split('T')[0], '%Y-%m-%d')
            articles.append({"title": title, "url": link, "date": date.strftime('%Y-%m-%d')})

        return articles
