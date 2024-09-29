from flask import Flask, request
from countyInfo import get_location, get_county_data

app = Flask(__name__)

@app.route('/api/coordinates_to_county', methods=['POST'])
def reverse_geocode():
    longitude = request.json['longitude']
    latitude = request.json['latitude']
    print(longitude, latitude)

    location = get_location(latitude, longitude)
    stats = None
    
    if location:
        stats = get_county_data(location['county'], location['state'])
        if stats:
            return {'location_data': location, 'county_data': stats, 'description': 'AI generated text'}
    
    return {'location_data': 'unavailable'}
