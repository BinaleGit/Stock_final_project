from flask import Blueprint, request, jsonify
import yfinance as yf
import json

current_price_bp = Blueprint('current_price_bp', __name__)

@current_price_bp.route('/current_price', methods=['POST'])
def get_current_price():
    try:
        data = json.loads(request.data)
        symbol = data.get('symbol')
        ticker = yf.Ticker(symbol)
        current_price = ticker.info.get('currentPrice')
        
        if current_price:
            return jsonify({'symbol': symbol, 'current_price': current_price}), 200
        else:
            return jsonify({'error': 'Failed to retrieve current price'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500
