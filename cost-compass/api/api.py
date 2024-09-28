from flask import Flask

app = Flask(__name__)

@app.route('/api/reverse_geocode')
def reverse_geocode():
    return {'county': 'alachua'}