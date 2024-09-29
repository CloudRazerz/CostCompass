from openai import OpenAI
from dotenv import load_dotenv
import os

def get_message(county, state, stats):
    load_dotenv()

    client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {
                "role": "user",
                "content": f"Based on the following county statistics, describe whether {county}, {state} would be a good place to live and explain why: Population: {stats['population']}, Median Home Value: ${stats['home_value']}, Median Housing Cost: ${stats['housing_cost']}, Median Household Income: {stats['household_income']}, Unemployment Rate: {stats['unemployment_rate']}, Poverty Rate: {stats['poverty_rate']}. Include the statistics that were just given. Consider factors such as the economy, cost of living, housing affordability, and overall quality of life. Provide a balanced view, highlighting both positive and negative aspects. Limit the response to 2-3 sentences."
            }
        ]
    )

    print(completion.choices[0].message.content)

    return completion.choices[0].message.content
