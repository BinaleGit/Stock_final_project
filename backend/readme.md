# Project Name

## Overview

This project is a comprehensive stock data application built using Flask for the backend API. It focuses on retrieving, storing, and analyzing stock information. The application includes functionality for web scraping to gather stock symbols from various sources and provides RESTful API endpoints for accessing detailed stock data.

## Project Structure

- **app.py**: Main entry point for the Flask application. Initializes routes and manages API requests.
- **enums.py**: Defines enums for categorizing stock markets and data sources used throughout the application.
- **suggestion_routes.py**: Handles API routes for suggesting stocks based on user input.
- **stock_routes.py**: Manages API routes for detailed stock information, search functionality, and fetching all stocks in the database.
- **rest_routes.py**: Provides RESTful API endpoints for retrieving detailed stock data.
- **graph_routes.py**: Manages API routes for fetching historical stock data to facilitate graphical representation and analysis.
- **stock_model.py**: Implements functionality for fetching and storing stock symbols from indices like S&P 500 and TA-125.
- **file_scraper/**:
  - **tase_scraper.py**: Script to scrape TASE (Tel Aviv Stock Exchange) stock symbols from Wikipedia.
  - **sp500_scraper.py**: Script to scrape S&P 500 stock symbols from Wikipedia.
  - **stock_service.py**: Manages stock symbols and data retrieval, including CSV handling.

## Usage

### Running the Flask App

To run the Flask application, follow these steps:

1. Ensure all dependencies are installed. See the Dependencies section for details.
2. Navigate to the project directory containing `app.py`.
3. Run the following command:

   ```bash
   python app.py


### Test stock
curl -X GET http://localhost:5000/api/stock/all_stocks
curl -X GET http://localhost:5000/api/stock/AAPL
curl -X GET "http://localhost:5000/api/stock/search?q=AAPL"

### Test articles
curl http://127.0.0.1:5000/api/edu/articles?source=google
curl http://127.0.0.1:5000/api/edu/articles?source=yahoo
curl http://127.0.0.1:5000/api/edu/articles?source=all


# Dependencies

- **Flask**: Web framework for building APIs.
- **Pandas**: Data manipulation library.
- **yfinance**: Yahoo Finance API for fetching stock data.
- **Beautiful Soup**: Python library for web scraping.
- **Requests**: HTTP library for making requests.
- **SQLAlchemy**: SQL toolkit and Object-Relational Mapping (ORM) for database operations.

# Files and Their Functions

## app.py

Main entry point for the Flask application. Initializes the Flask app, sets up routes, and handles API requests and responses related to stock data.

## enums.py

Defines enums that categorize stock markets and data sources used within the application. These enums help maintain consistency and clarity throughout the codebase.

## suggestion_routes.py

Contains API routes for suggesting stocks based on user input. It utilizes algorithms and data stored within the application to provide relevant stock suggestions.

## stock_routes.py

Manages API routes for retrieving detailed stock information, enabling search functionalities, and fetching all stocks available in the database. This file provides endpoints for CRUD (Create, Read, Update, Delete) operations related to stock data.

## rest_routes.py

Provides RESTful API endpoints specifically designed for fetching detailed stock data from the application's database. These endpoints adhere to REST principles for efficient data retrieval.

## graph_routes.py

Handles API routes responsible for fetching historical stock data, facilitating graphical representation and analysis. It provides endpoints to retrieve historical stock prices and volumes for visualization purposes.

## stock_model.py

Implements functionality to fetch and store stock symbols from indices like S&P 500 and TA-125. This module enhances the application's data retrieval capabilities by ensuring up-to-date and accurate stock information.

## file_scraper/

Directory containing scripts responsible for scraping stock symbols from various sources such as Wikipedia, enhancing the application's database with updated and relevant stock data.

- **tase_scraper.py**: Scrapes TASE (Tel Aviv Stock Exchange) stock symbols from Wikipedia. It parses HTML content to extract stock symbols and stores them in the application's database.
- **sp500_scraper.py**: Scrapes S&P 500 stock symbols from Wikipedia. It retrieves stock symbols from a predefined list and updates the database with new entries.
- **stock_service.py**: Manages stock symbols and data retrieval, including CSV handling. This script interacts with CSV files to import/export stock data and manages stock-related operations within the application.

# Contributing

Guidelines for contributing to the project, if applicable. Include information about how to report issues, propose features, and submit pull requests.

# License

Information about the project's license. Specify the license type (e.g., MIT, Apache 2.0) and include any additional terms or disclaimers.

# Authors

List of authors or contributors to the project. Include their names and, if applicable, their roles or contributions to the project.

# Acknowledgments

Acknowledgments or credits to anyone whose work or contributions have been instrumental in the project. This section may include mentions of libraries, frameworks, or individuals who provided inspiration or support.

# Additional Notes

Any additional notes or information relevant to the project that may assist users or developers in understanding its purpose, scope, or implementation details.
