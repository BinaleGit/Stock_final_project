from flask import Blueprint, jsonify, request
from NEWS.scraper_factory import ScraperFactory
from enums import NewsSource
from datetime import datetime, timedelta
import csv
import time

edu_bp = Blueprint('edu', __name__)

# Cache for articles
articles_cache = {
    "data": [],
    "timestamp": datetime.now() - timedelta(minutes=10)  # Force update on first request
}

# Dummy data for tutorials, glossary, and videos
tutorials_data = [{"title": "Stock Market Basics", "url": "https://www.investopedia.com/articles/basics/06/invest1000.asp"}]
glossary_data = [{"title": "Stock Market Basics", "url": "https://www.nasdaq.com/glossary"}]
videos_data = [{"title": "How To Start Investing In Stocks", "embed_url": "https://www.youtube.com/embed/86rPBAnRCHc"}]

def read_stock_tickers(csv_file_path):
    stock_tickers = []
    with open(csv_file_path, 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            stock_tickers.append(row['Ticker'])
    return stock_tickers

def scrape_articles(stock_tickers, sources, page=1, limit=5):
    all_articles = []
    count = 0
    for stock in stock_tickers:
        for source in sources:
            scraper = ScraperFactory.get_scraper(source, stock, page)
            articles = scraper.scrape()
            all_articles.extend(articles)
            count += len(articles)
            if count >= limit:
                break
        if count >= limit:
            break
    return all_articles

def get_cached_articles(stock_tickers, sources, page=1, limit=5):
    global articles_cache
    now = datetime.now()
    if (now - articles_cache['timestamp']) > timedelta(minutes=5):
        articles_cache['data'] = scrape_articles(stock_tickers, sources, page, limit)
        articles_cache['timestamp'] = now
    else:
        articles_cache['data'].extend(scrape_articles(stock_tickers, sources, page, limit))
    return articles_cache['data']

@edu_bp.route('/articles', methods=['GET'])
def get_articles():
    csv_file_path = 'csv_files/all_stocks.csv'
    stock_tickers = read_stock_tickers(csv_file_path)

    page = int(request.args.get('page', 1))
    limit = int(request.args.get('limit', 5))
    query = request.args.get('query', '')  # Add support for keyword search
    source_param = request.args.get('source', 'all')
    sources = {
        'google': [NewsSource.GOOGLE_NEWS],
        'yahoo': [NewsSource.YAHOO_FINANCE],
        'all': [NewsSource.GOOGLE_NEWS, NewsSource.YAHOO_FINANCE]
    }.get(source_param.lower(), [NewsSource.GOOGLE_NEWS, NewsSource.YAHOO_FINANCE])

    if query:
        stock_tickers = [query]  # Override stock tickers with the query keyword

    all_articles = get_cached_articles(stock_tickers, sources, page, limit)

    # Sort articles by date (assuming articles have a 'date' field)
    all_articles.sort(key=lambda x: datetime.strptime(x.get('date', '1970-01-01'), '%Y-%m-%d'), reverse=True)

    # Implement pagination
    paginated_articles = all_articles[:limit]

    return jsonify({
        'articles': paginated_articles,
        'page': page,
        'limit': limit,
        'total_articles': len(all_articles)
    })

@edu_bp.route('/tutorials', methods=['GET'])
def get_tutorials():
    return jsonify(tutorials_data)

@edu_bp.route('/glossary', methods=['GET'])
def get_glossary():
    return jsonify(glossary_data)

@edu_bp.route('/videos', methods=['GET'])
def get_videos():
    return jsonify(videos_data)
