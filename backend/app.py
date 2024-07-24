from flask import Flask
from flask_cors import CORS
from apscheduler.schedulers.background import BackgroundScheduler
from models.stock_model import fetch_all_stock_symbols
from routes.stock_routes import stock_bp
from routes.suggestion_routes import suggestion_bp
from routes.graph_routes import graph_bp
from routes.rest_routes import rest_bp
from routes.edu_routes import edu_bp
from NEWS.scraper_factory import ScraperFactory
from enums import NewsSource

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

app.register_blueprint(stock_bp, url_prefix='/api/stock')
app.register_blueprint(suggestion_bp, url_prefix='/api/suggestions')
app.register_blueprint(graph_bp, url_prefix='/api/graph/')
app.register_blueprint(rest_bp, url_prefix='/api/rest')
app.register_blueprint(edu_bp, url_prefix='/api/edu')

fetch_all_stock_symbols()

def scrape_and_update():
    sources = [NewsSource.GOOGLE_NEWS, NewsSource.YAHOO_FINANCE]

    articles = []
    for source in sources:
        scraper = ScraperFactory.get_scraper(source, "AAPL")
        articles.extend(scraper.scrape())
    
    # Here, you'd save articles to your database or any other storage
    print(articles)  # Replace with actual save logic

scheduler = BackgroundScheduler()
scheduler.add_job(scrape_and_update, 'interval', days=1)  # Schedules job to run daily
scheduler.start()

if __name__ == '__main__':
    app.run(debug=True)
