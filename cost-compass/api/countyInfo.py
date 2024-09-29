from flask import Flask, jsonify
from dotenv import load_dotenv
import os
import requests
import pandas as pd

def get_location(lat, lng):
    load_dotenv()
    google_api_key = os.getenv('REACT_APP_API_KEY')

    geocoding_url = f"https://maps.googleapis.com/maps/api/geocode/json?latlng={lat},{lng}&key={google_api_key}"

    response = requests.get(geocoding_url)
    results = response.json().get('results', [])

    for result in results:
        address_components = result.get('address_components', [])
        for component in address_components:
            if 'administrative_area_level_2' in component.get('types', []):
                county = component.get('long_name')
            if 'administrative_area_level_1' in component.get('types', []):
                state = component.get('long_name')
                location = [county, state]
                return location
    
    return None


def json_to_dataframe(response):
    return pd.DataFrame(response.json()[1:], columns=response.json()[0])


def get_county_data(county, state):
    load_dotenv()
    census_api_key = os.getenv('CENSUS_API_KEY')

    # Median Home Value by Florida county (Dollars)
    url = "https://api.census.gov/data/2022/acs/acs5?get=NAME,B25077_001E&for=county:*&in=state:*&key={}".format(census_api_key)
    response = requests.request("GET", url)
    home_val_df = json_to_dataframe(response)
    home_val_df = home_val_df[home_val_df['NAME'] == f"{county}, {state}"]
    
    home_val = home_val_df['B25077_001E'].iloc[0]

    # Median Monthly Housing Cost
    url = "https://api.census.gov/data/2022/acs/acs5?get=NAME,B25105_001E&for=county:*&in=state:*&key={}".format(census_api_key)
    response = requests.request("GET", url)
    housing_cost_df = json_to_dataframe(response)
    housing_cost_df = housing_cost_df[housing_cost_df['NAME'] == f"{county}, {state}"]

    housing_cost = housing_cost_df['B25105_001E'].iloc[0]

    # Median Household Income (in the last 12 months)
    url = "https://api.census.gov/data/2022/acs/acs5?get=NAME,B19013_001E&for=county:*&in=state:*&key={}".format(census_api_key)
    response = requests.request("GET", url)
    household_income_df = json_to_dataframe(response)
    household_income_df = household_income_df[household_income_df['NAME'] == f"{county}, {state}"]

    household_income = household_income_df['B19013_001E'].iloc[0]

    print()
    print(f"Location: {county}, {state}")
    print(f"Median Home Value: ${home_val}")
    print(f"Median Monthly Housing: ${housing_cost}")
    print(f"Median Household Income: ${household_income}")
    print()

    stats = [home_val, housing_cost, household_income]
    return stats
