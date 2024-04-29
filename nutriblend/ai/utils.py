import pathlib
import textwrap

import google.generativeai as genai
from django.conf import settings
import requests

# def generate_ai_response(prompt):
#     print("prompt", prompt)
#     GOOGLE_API_KEY = settings.GOOGLE_API_KEY
#     genai.configure(api_key=GOOGLE_API_KEY)
#     model = genai.GenerativeModel('gemini-pro')
#     ai_response = model.generate_content(prompt)
#     return ai_response.text



def generate_ai_response(prompt_text):
    print("prompt", prompt_text)

    GOOGLE_API_KEY = settings.GOOGLE_API_KEY
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={GOOGLE_API_KEY}"
    headers = {'Content-Type': 'application/json'}

    data = {
        "contents": [{
            "parts": [{
                "text": prompt_text
            }]
        }]
    }

    response = requests.post(url, json=data, headers=headers)
    
    if response.status_code == 200:
        response_dict = response.json()
        ai_response = response_dict['candidates'][0]['content']['parts'][0]['text']
        # ai_response = response.json().get('contents', [{}])[0].get('parts', [{}])[0].get('text', '')
        return ai_response
    else:
        print(f"Error: {response.status_code}, {response.text}")
        return None



def generate_recipe_ai_prompt(user_profile, user_message):
    # Extract user preferences from the UserProfile model
    username = user_profile.username
    dietary_preferences = user_profile.diatary_prefrence
    allergies = user_profile.allergies
    health_condition = user_profile.health_condition
    ingredient_restrictions = user_profile.ingredient_restrictions.all()

    # Construct the prompt incorporating user preferences
    prompt = f"Generate a recipe for {username}.This is {username} message: {user_message}\n"
    f"Consider the following health preferences and restrictions when generating the recipe:\n"

    if dietary_preferences:
        prompt += f"- Dietary preferences: {', '.join(dietary_preferences)}\n"

    if allergies:
        prompt += f"- Allergies: {', '.join(allergies)}\n"

    if health_condition:
        prompt += f"- Health condition: {', '.join(health_condition)}\n"

    if ingredient_restrictions:
        restricted_ingredients = [ingredient.name for ingredient in ingredient_restrictions]
        prompt += f"- Ingredient restrictions: {', '.join(restricted_ingredients)}\n"

    prompt += "Your response must be a valid json with these keys: 'title', 'cuisine_type', 'meal_category', 'cooking_time', 'step' and 'ingredients'\n"

    ai_response = generate_ai_response(prompt)
    return ai_response
