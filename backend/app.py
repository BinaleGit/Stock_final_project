from flask import Flask
from flask_cors import CORS
from routes.stock_routes import stock_bp
from routes.suggestion_routes import suggestion_bp
from routes.graph_routes import graph_bp
from routes.edu_routes import edu_bp
from routes.current_price import current_price_bp  # Import the new current price blueprint
from enums import NewsSource

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

app.register_blueprint(stock_bp, url_prefix='/api/stock')
app.register_blueprint(suggestion_bp, url_prefix='/api/suggestions')
app.register_blueprint(graph_bp, url_prefix='/api/graph/')
app.register_blueprint(edu_bp, url_prefix='/api/edu')
app.register_blueprint(current_price_bp, url_prefix='/api')  # Register the new current price blueprint


if __name__ == '__main__':
    app.run(debug=True)
