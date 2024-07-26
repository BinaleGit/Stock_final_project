from flask import Flask, Blueprint, jsonify, request
import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse


app = Flask(__name__)
edu_bp = Blueprint('edu', __name__)

# Dummy data for tutorials, glossary, and videos
tutorials_data = [{"title": "Stock Market Basics", "url": "https://www.investopedia.com/articles/basics/06/invest1000.asp"}]
glossary_data = [{"title": "Stock Market Basics", "url": "https://www.nasdaq.com/glossary"}]
videos_data = [{"title": "How To Start Investing In Stocks", "embed_url": "https://www.youtube.com/embed/86rPBAnRCHc"}]


def fetch_google_news(query):
    url = f"https://www.google.com/search?q={query}&tbm=nws"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')
    articles = []

    for item in soup.select('div.n0jPhd.ynAwRc.MBeuO.nDgy9d'):
        try:
            title = item.select_one('span').text
            link = item.find_parent('a')['href']
            description = item.find_next_sibling('div').text
            domain = urlparse(link).netloc
            articles.append({
                'title': title,
                'url': link,
                'description': description,
                'source': domain
            })
        except AttributeError as e:
            print(f"Error parsing article: {e}")

    return articles


@edu_bp.route('/articles', methods=['GET'])
def get_articles():
    query = request.args.get('query', '')
    if not query:
        return jsonify({'error': 'Query parameter is required'}), 400

    articles = fetch_google_news(query)

    return jsonify({
        'articles': articles,
        'query': query,
        'total_articles': len(articles)
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

app.register_blueprint(edu_bp, url_prefix='/api/edu')

if __name__ == '__main__':
    app.run(debug=True)
