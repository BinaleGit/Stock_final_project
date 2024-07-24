"""
Routes for REST API endpoints related to stocks.
"""

from flask import Blueprint, jsonify
from models.stock_model import get_all_stocks

rest_bp = Blueprint('rest_bp', __name__)

@rest_bp.route('/stocks', methods=['GET'])
def get_all_stocks_route():
    """
    Retrieve all stocks from the database.
    
    Returns:
        JSON: List of all stocks with their details.
    """
    stocks = get_all_stocks()
    return jsonify(stocks)

@rest_bp.route('/stocks/<symbol>', methods=['GET'])
def get_stock(symbol):
    """
    Retrieve details of a specific stock identified by its symbol.
    
    Args:
        symbol (str): Stock symbol to retrieve details for.
        
    Returns:
        JSON: Details of the stock including Symbol, Security, Exchange, Sector, and Industry.
        Returns an error message and 404 status code if the stock is not found.
    """
    symbol = symbol.upper()
    stock = next((stock for stock in get_all_stocks() if stock['Symbol'] == symbol), None)
    if stock:
        return jsonify(stock)
    
    return jsonify({"error": f"Stock with symbol '{symbol}' not found"}), 404
