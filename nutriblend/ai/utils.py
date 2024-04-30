import json
from django.conf import settings
import requests

from main.models import Ingredients, RecipeDetails, Recipes

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



# def generate_recipe_ai_prompt(user_profile, user_message):
#     # Extract user preferences from the UserProfile model
#     username = user_profile.username
#     dietary_preferences = user_profile.diatary_prefrence
#     allergies = user_profile.allergies
#     health_condition = user_profile.health_condition
#     ingredient_restrictions = user_profile.ingredient_restrictions.all()

#     # Construct the prompt incorporating user preferences
#     prompt = f"Generate a recipe for {username}.This is {username} message: {user_message}\n"
#     f"Consider the following health preferences and restrictions when generating the recipe:\n"

#     if dietary_preferences:
#         prompt += f"- Dietary preferences: {', '.join(dietary_preferences)}\n"

#     if allergies:
#         prompt += f"- Allergies: {', '.join(allergies)}\n"

#     if health_condition:
#         prompt += f"- Health condition: {', '.join(health_condition)}\n"

#     if ingredient_restrictions:
#         restricted_ingredients = [ingredient.name for ingredient in ingredient_restrictions]
#         prompt += f"- Ingredient restrictions: {', '.join(restricted_ingredients)}\n"

#     prompt += "Your response must be a valid json with these keys: 'title', 'cuisine_type', 'meal_category', 'cooking_time', 'step' and 'ingredients'\n"

#     ai_response = generate_ai_response(prompt)
#     return ai_response



def generate_recipe_ai_prompt(user_profile, user_message):
    # Extract user preferences
    username = user_profile.username
    preferences = {
        "dietary_preferences": user_profile.diatary_prefrence,
        "allergies": user_profile.allergies,
        "health_condition": user_profile.health_condition,
        "restrictions": [ingredient.name for ingredient in user_profile.ingredient_restrictions.all()]
    }

    # Construct the prompt with structured data
    prompt = f"Generate a recipe for {username} based on the following:\n"
    prompt += f"- User request: {user_message}\n"
    prompt += f"- Preferences: {json.dumps(preferences)}\n"
    prompt += "Your response must be only a valid JSON with these keys: 'title', 'cuisine_type', 'meal_category', 'cooking_time', 'steps' (list of steps), and 'ingredients' (list of ingredients with quantities) using the following structure:\n"
    prompt += '''{
                    "title": "xx",
                    "cuisine_type": "xx",
                    "meal_category": "xx",
                    "cooking_time": "xx",
                    "steps": [
                        "xx",
                        "xx",
                        "xx"
                    ],
                    "ingredients": [
                        {
                        "quantity": "x",
                        "name": "xx"
                        },
                        {
                        "quantity": "x",
                        "name": "xx"
                        }
                    ]
                }\n'''
    prompt += "All fields are required.\n"

    ai_response = generate_ai_response(prompt)

    create_receipe(user_profile, ai_response)

    return ai_response


def create_receipe(user_profile, ai_response):
    print("-----response_data-----", ai_response)
    try:
        response_data = json.loads(ai_response)
    except json.JSONDecodeError:
        print("Error: Invalid JSON response from AI model.")
        return None

    # Create the Recipes object
    recipe = Recipes.objects.create(
        user=user_profile.user,
        title=response_data.get('title'),
        cuisine_type=response_data.get('cuisine_type'),
        meal_category=response_data.get('meal_category'),
        cooking_time=response_data.get('cooking_time'),
        steps=response_data.get('steps'),
    )

  # Create RecipeDetails objects for each ingredient
    ingredients = response_data.get('ingredients', [])
    for ingredient in ingredients:
        # Assuming you have an Ingredients model with a name field
        ingredient_obj, created = Ingredients.objects.get_or_create(name=ingredient.get('name'))
        RecipeDetails.objects.create(
            recipe=recipe,
            ingredients=ingredient_obj,
            quantity=ingredient.get('quantity'),
        )

#   return recipe
