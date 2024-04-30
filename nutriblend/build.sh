#!/usr/bin/env bash

set -o errexit  # exit when there is an error error
# pip install --upgrade pip

pip install -r requirements.txt

# python manage.py collectstatic --no-input
python manage.py makemigrations user_auth
python manage.py makemigrations core
python manage.py makemigrations main
python manage.py makemigrations ai

# python manage.py makemigrations user_auth
python manage.py migrate

#python manage.py superuser

