# tests/test_routes.py
import unittest
from app import app

class NewsApiTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_google_news(self):
        response = self.app.get('/news/google')
        self.assertEqual(response.status_code, 200)
        self.assertTrue(len(response.json) > 0)

    def test_yahoo_news(self):
        response = self.app.get('/news/yahoo')
        self.assertEqual(response.status_code, 200)
        self.assertTrue(len(response.json) > 0)

    def test_invalid_source(self):
        response = self.app.get('/news/invalid_source')
        self.assertEqual(response.status_code, 400)

    def test_clear_cache(self):
        response = self.app.post('/clear_cache')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json['message'], "Cache cleared")

if __name__ == '__main__':
    unittest.main()
