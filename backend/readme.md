# Yahoo FA Graf Search

**Yahoo FA Graf Search** is an application designed to retrieve, visualize, and analyze stock data, integrating educational resources and real-time news. It features a Flask backend for API services and a React frontend for user interaction.

## Project Structure

### Backend

The backend is organized as follows:

- **`/file_scraper`**: Contains scripts for scraping stock data and services.
  - `sp500_scraper.py`: Scrapes data from the S&P 500 index.
  - `stock_service.py`: Service script for handling stock-related operations.
  - `tase_scraper.py`: Scrapes data from the Tel Aviv Stock Exchange.

- **`/models`**: Includes data models and database operations.
  - `stock_model.py`: Defines data models and database interactions for stock data.

- **`/NEWS`**: Contains news scraping functionalities.
  - `scraper_factory.py`: Factory for creating news scrapers based on the source.

- **`/routes`**: Contains API endpoints.
  - `edu_routes.py`: Endpoints for educational resources.
  - `graph_routes.py`: Endpoints for stock data graphs and reports.
  - `rest_routes.py`: General stock information endpoints.
  - `stock_routes.py`: Detailed stock information and search functionalities.
  - `suggestion_routes.py`: Endpoints for stock suggestions based on user input.

- **`/test`**: Contains unit tests for the backend.
  - `test_routes.py`: Tests for news-related endpoints and cache management.
  - `test_yfinance.py`: Tests for stock data retrieval.

- **`app.py`**: Main application setup, including route registration and background tasks for scraping and updating news.

- **`enums.py`**: Defines enums for stock markets, data sources, news sources, and search modes.

- **`requirements.txt`**: Lists the required Python packages.

### Frontend

The frontend is built with React and includes:

- **`/public`**: Contains static assets.
  - `index.html`: Main HTML file.
  - Other static files such as images and icons.

- **`/src`**: Contains the React source code.
  - **`/components`**: React components for various UI elements.
    - **`/EducationalResources`**: Components for articles, glossary, tutorials, and videos.
    - **`/Graph`**: Components for displaying stock graphs.
    - Other components like filters, footers, headers, etc.
  - **`/screens`**: Different screens or pages of the application.
  - **`/styles`**: CSS and style-related files.
  - `App.js`: Main application component.
  - `Routes.js`: Defines the application routes.

- **`package.json`**: Lists the required Node.js packages.
- **`package-lock.json`**: Ensures consistent dependency installation.
- **`postcss.config.js`**: Configuration for PostCSS.
- **`tailwind.config.js`**: Configuration for Tailwind CSS.

## Setup and Installation

### Backend

1. **Clone the Repository**

    ```bash
    git clone https://github.com/BinaleGit/yahoo_fa_graf_search.git
    cd yahoo_fa_graf_search/backend
    ```

2. **Create and Activate a Virtual Environment**

    ```bash
    python -m venv myenv
    source myenv/bin/activate  # On Windows, use `myenv\Scripts\activate`
    ```

3. **Install Dependencies**

    ```bash
    pip install -r requirements.txt
    ```

4. **Run the Flask Application**

    ```bash
    python app.py
    ```

### Frontend

1. **Navigate to the Frontend Directory**

    ```bash
    cd ../stock-dashboard
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

3. **Start the React Application**

    ```bash
    npm start
    ```

## API Endpoints

### Educational Resources

- `GET /api/edu/articles`: Fetch educational articles.
- `GET /api/edu/tutorials`: Fetch tutorials.
- `GET /api/edu/glossary`: Fetch glossary terms.
- `GET /api/edu/videos`: Fetch educational videos.

### Stock Data

- `GET /api/stock/<symbol>`: Retrieve detailed stock information for the given symbol.
- `GET /api/stock/search`: Search for stocks based on a query.
- `GET /api/stock/all_stocks`: Retrieve a list of all available stocks.

### Stock Data Graphs and Reports

- `GET /api/graph/<symbol>`: Get graphical representation of stock data.
- `POST /api/graph/report/<symbol>`: Generate and download a BI report for the specified symbol.

### Suggestions

- `GET /api/suggestions/<user_input>`: Get stock suggestions based on user input.

### News

- `GET /news/google`: Retrieve news articles from Google News.
- `GET /news/yahoo`: Retrieve news articles from Yahoo Finance.
- `POST /clear_cache`: Clear the news cache.
