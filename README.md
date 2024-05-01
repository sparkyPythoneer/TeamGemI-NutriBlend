# NutriBlend BACKEND

## Introduction

This is the repository that holds the backend code that powers the NutriBlend Project.

## About NutriBlend

NutriBlend is a recipe generation application that leverages AI to suggest innovative and personalized recipes based on user preferences and available ingredients. The AI analyzes flavor profiles, cooking techniques, and nutritional content to provide users with creative culinary ideas.


# Visual representation of NutriBlend database schemas and structures.
![Nutri Blend](https://github.com/sparkyPythoneer/TeamGemI-NutriBlend/assets/29266211/94df14e2-f018-4099-b80b-d24348f4044a)

Important Links
-------------
- [Vist the website](https://documenter.getpostman.com/view/20647049/2s9YJez1on#intro).
- [API Documentation](https://www.postman.com/navigation-pilot-15465601/workspace/nutri-public/collection/25891891-fc796e99-9866-4238-917e-43338b6204b8?action=share&creator=25891891).
- [Read Our Product Requirement Docs](https://documenter.getpostman.com/view/20647049/2s9YJez1on#intro)


## Installation

1.  Clone the repository from [GitHub](https://github.com/LibertytechX/GetLinkBackend.git).

2.  Create a virtual environment and install the required dependencies using `pip install -r requirements.txt`.

3.  Configure the database settings in `settings.py`.

4.  Apply database migrations with `python manage.py migrate`.

5.  Set up environment variables for sensitive information (e.g., `SECRET_KEY`, `MAILGUN_API_KEY`).

6.  Run the development server with `python manage.py runserver`.

7.  Access the application in your web browser at `http://localhost:8000`.


Backend Tech Stack
--------------

- Language: Python 3.10
- Framework: Django 4.0+
- Database: PostgreSQL
- API used: Gemini Pro


Frontend Tech Stack
--------------

- Language: Javascript
- Framework: Next js, React js

Authentication
--------------

Authentication is required for most endpoints in the API. To authenticate, include an access token in the `Authorization` header of your request. The access token can be obtained by logging in to your account or registering a new account.




