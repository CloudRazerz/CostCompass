from flask import Flask, request
from countyInfo import get_county_name, get_county_data

app = Flask(__name__)

@app.route('/api/zip_to_county', methods=['POST'])
def reverse_geocode():
    longitude = request.json['longitude']
    latitude = request.json['latitude']
    print(longitude, latitude)

    county = get_county_name(latitude, longitude)

    if county:
        stats = get_county_data(county)

    return {'latitude': latitude, 'longitude': longitude}