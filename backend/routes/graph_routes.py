from datetime import datetime, timedelta
import yfinance as yf
from flask import Blueprint, jsonify, request, send_file
import logging
import openpyxl

graph_bp = Blueprint('graph_bp', __name__)

# Configure logging
logging.basicConfig(level=logging.DEBUG)

@graph_bp.route('/<symbol>', methods=['GET'])
def get_stock_data_graph(symbol):
    symbol = symbol.upper()
    end_date = datetime.now().strftime('%Y-%m-%d')
    start_date = (datetime.now() - timedelta(days=365)).strftime('%Y-%m-%d')
    
    try:
        logging.debug(f"Fetching data for symbol: {symbol}")
        data = yf.download(symbol, start=start_date, end=end_date)
        
        # Check if data is empty
        if data.empty:
            error_message = f"No data found for symbol '{symbol}'"
            logging.error(error_message)
            return jsonify({"error": error_message}), 404
        
        processed_data = {
            'Date': data.index.strftime('%Y-%m-%d').tolist(),
            'Close': data['Close'].tolist(),
            'Open': data['Open'].tolist(),
            'High': data['High'].tolist(),
            'Low': data['Low'].tolist(),
            'Volume': data['Volume'].tolist(),
            'CloseDiff': data['Close'].diff().fillna(0).tolist(),
            'OpenDiff': data['Open'].diff().fillna(0).tolist(),
            'HighDiff': data['High'].diff().fillna(0).tolist(),
            'LowDiff': data['Low'].diff().fillna(0).tolist(),
            'VolumeDiff': data['Volume'].diff().fillna(0).tolist()
        }
        return jsonify(processed_data)
    
    except Exception as e:
        error_message = f"Failed to fetch data for symbol '{symbol}': {str(e)}"
        logging.error(error_message)
        return jsonify({"error": error_message}), 500


@graph_bp.route('/report/<symbol>', methods=['POST'])
def generate_bi_report(symbol):
    symbol = symbol.upper()
    start_date = request.json.get('startDate')
    end_date = request.json.get('endDate')
    
    try:
        # Convert start_date and end_date to datetime objects
        start_date = datetime.strptime(start_date, '%Y-%m-%d')
        end_date = datetime.strptime(end_date, '%Y-%m-%d')

        logging.debug(f"Generating BI report for symbol: {symbol}, from {start_date} to {end_date}")
        data = yf.download(symbol, start=start_date, end=end_date.strftime('%Y-%m-%d'))
        
        # Generate report file (e.g., Excel)
        filename = f"{symbol}_BI_Report_{start_date.strftime('%Y-%m-%d')}_{end_date.strftime('%Y-%m-%d')}.xlsx"
        data.to_excel(filename)  # Save to Excel format
        
        return send_file(filename, as_attachment=True)
    
    except Exception as e:
        error_message = f"Failed to generate BI report for symbol '{symbol}': {str(e)}"
        logging.error(error_message)
        return jsonify({"error": error_message}), 500

