from flask import Flask, request
from countyInfo import get_location, get_county_data

app = Flask(__name__)

@app.route('/api/coordinates_to_county', methods=['POST'])
def reverse_geocode():
    longitude = request.json['longitude']
    latitude = request.json['latitude']
    print(longitude, latitude)

    [county, state] = get_location(latitude, longitude)

    stats = get_county_data(county, state)

    return {'latitude': latitude, 'longitude': longitude}
