# file: your_blueprint_file.py

from flask import Blueprint, jsonify
from file_scraper.stock_service import ALL_STOCKS

suggestion_bp = Blueprint('suggestion_bp', __name__)

@suggestion_bp.route('/<user_input>', methods=['GET'])
def get_suggestions(user_input):
    """
    Get suggestions based on user input.

    Args:
        user_input (str): The input string from the user.

    Returns:
        JSON: List of up to 5 matching suggestions including symbol and name.
    """
    user_input = user_input.upper()  # Ensure input is uppercase for consistency
    matching_suggestions = [
        {"symbol": stock['Symbol'], "name": stock['Security']}
        for stock in ALL_STOCKS
        if user_input in stock['Symbol'].upper() or user_input in stock['Security'].upper()
    ][:5]
    print(f"Suggestions for input '{user_input}':", matching_suggestions)  # Debugging line
    return jsonify(matching_suggestions)
