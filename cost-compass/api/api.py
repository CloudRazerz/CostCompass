from flask import Flask, request

app = Flask(__name__)

@app.route('/api/coordinates_to_county', methods=['POST'])
def reverse_geocode():
    longitude = request.json['longitude']
    latitude = request.json['latitude']
    print(longitude, latitude)
    return {'latitude': latitude, 'longitude': longitude}