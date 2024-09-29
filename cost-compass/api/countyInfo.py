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
                try:
                    county = component.get('long_name')
                except:
                    return None
            if 'administrative_area_level_1' in component.get('types', []):
                try:
                    state = component.get('long_name')
                    location = {'county': county, 'state': state}
                    return location
                except:
                    return None
    
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

    # Total Unemployment
    url = "https://api.census.gov/data/2022/acs/acs5?get=NAME,B23025_005E&for=county:*&in=state:*&key={}".format(census_api_key)
    response = requests.request("GET", url)
    unemployment_totals_df = json_to_dataframe(response)

    # Total Labor Force
    url = "https://api.census.gov/data/2022/acs/acs5?get=NAME,B23025_003E&for=county:*&in=state:*&key={}".format(census_api_key)
    response = requests.request("GET", url)
    labor_force_df = json_to_dataframe(response)

    # Unemployment Rate
    unemployment_totals_df.columns = ['County', 'Unemployed', 'State', 'County_Code']
    labor_force_df.columns = ['County', 'Labor_Force', 'State', 'County_Code']
    unemployment_rate_df = pd.merge(unemployment_totals_df, labor_force_df, on=['County', 'State', 'County_Code'])

    unemployment_rate_df['Unemployed'] = pd.to_numeric(unemployment_rate_df['Unemployed'], errors='coerce')              # Convert from strings to floats
    labor_force_df['Labor_Force'] = pd.to_numeric(labor_force_df['Labor_Force'], errors='coerce')

    unemployment_rate_df['Unemployment_Rate'] = (unemployment_rate_df['Unemployed'] / labor_force_df['Labor_Force']) * 100.0

    unemployment_rate = round(unemployment_rate_df['Unemployment_Rate'].iloc[0])

    # Total Poverty
    url = "https://api.census.gov/data/2022/acs/acs5?get=NAME,B17001_002E&for=county:*&in=state:*&key={}".format(census_api_key)
    response = requests.request("GET", url)
    poverty_totals_df = json_to_dataframe(response)

    # Population
    url = "https://api.census.gov/data/2022/acs/acs5?get=NAME,B01003_001E&for=county:*&in=state:*&key={}".format(census_api_key)
    response = requests.request("GET", url)
    population_df = json_to_dataframe(response)

    population = population_df['B01003_001E'].iloc[0]

    # Poverty Rate
    poverty_totals_df.columns = ['County', 'Number_in_Poverty', 'State', 'County_Code']
    population_df.columns = ['County', 'Population', 'State', 'County_Code']
    poverty_rate_df = pd.merge(poverty_totals_df, population_df, on=['County', 'State', 'County_Code'])

    poverty_totals_df['Number_in_Poverty'] = pd.to_numeric(poverty_totals_df['Number_in_Poverty'], errors='coerce')              # Convert from strings to floats
    population_df['Population'] = pd.to_numeric(population_df['Population'], errors='coerce')

    poverty_rate_df['Poverty_Rate'] = (poverty_totals_df['Number_in_Poverty'] / population_df['Population']) * 100.0

    poverty_rate = round(poverty_rate_df['Poverty_Rate'].iloc[0])

    print()
    print(f"Location: {county}, {state}")
    print(f"Population: {population}")
    print(f"Median Home Value: ${home_val}")
    print(f"Median Monthly Housing: ${housing_cost}")
    print(f"Median Household Income: ${household_income}")
    print(f"Unemployment Rate: {unemployment_rate}%")
    print(f"Poverty Rate: {poverty_rate}%")
    print()

    stats = {'population': population, 
             'home_value': home_val, 
             'housing_cost': housing_cost, 
             'household_income': household_income,
             'unemployment_rate': unemployment_rate,
             'poverty_rate': poverty_rate
             }

    return stats
